import { NextResponse } from "next/server";

import {
  WISHLIST_MUTATION_ERROR_CODES,
  toggleWishlistInputSchema,
} from "@pulse/domain";

import { toggleWishlist } from "@/data/wishlist/toggle-wishlist.server";
import { MESSAGES } from "@/lib/messages";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = toggleWishlistInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        code: WISHLIST_MUTATION_ERROR_CODES.VALIDATION,
        message: MESSAGES.wishlist.validationError,
      },
      { status: 400 },
    );
  }

  const result = await toggleWishlist(parsed.data);
  const status = result.ok
    ? 200
    : result.code === WISHLIST_MUTATION_ERROR_CODES.UNAUTHORIZED
      ? 401
      : 400;

  return NextResponse.json(result, { status });
}
