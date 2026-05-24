import { NextResponse } from "next/server";

import {
  approveTrainerInputSchema,
  TRAINER_MUTATION_ERROR_CODES,
} from "@pulse/domain";

import { approveTrainerWithCacheInvalidation } from "@/data/admin/approve-trainer.server";
import { MESSAGES } from "@/lib/messages";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = approveTrainerInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        code: TRAINER_MUTATION_ERROR_CODES.VALIDATION,
        message: MESSAGES.admin.errors.validation,
      },
      { status: 400 },
    );
  }

  const result = await approveTrainerWithCacheInvalidation(parsed.data);
  if (!result.ok) {
    const message =
      result.code === TRAINER_MUTATION_ERROR_CODES.APPLICATION_INCOMPLETE
        ? MESSAGES.admin.moderation.incomplete
        : result.code === TRAINER_MUTATION_ERROR_CODES.ALREADY_PROCESSED
          ? MESSAGES.admin.moderation.alreadyProcessed
          : MESSAGES.admin.errors.generic;

    return NextResponse.json({ ...result, message }, { status: 400 });
  }

  return NextResponse.json(result, { status: 200 });
}
