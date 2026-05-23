import "server-only";

import { USER_ROLE } from "@pulse/domain";

import { getWishlistedTrainerIds } from "@/data/wishlist/is-trainer-wishlisted.server";
import { getPolicySessionContext } from "@/server/auth/session-to-policy-context";

export type WishlistUiContext = {
  isAuthenticated: boolean;
  canToggle: boolean;
  wishlistedIds: Set<string>;
};

export async function getWishlistUiContext(
  trainerProfileIds: string[] = [],
): Promise<WishlistUiContext> {
  const ctx = await getPolicySessionContext();
  const canToggle = ctx?.role === USER_ROLE.CLIENT;

  if (!ctx || !canToggle) {
    return {
      isAuthenticated: Boolean(ctx),
      canToggle: false,
      wishlistedIds: new Set(),
    };
  }

  const wishlistedIds = await getWishlistedTrainerIds(
    ctx.userId,
    trainerProfileIds,
  );

  return {
    isAuthenticated: true,
    canToggle: true,
    wishlistedIds,
  };
}
