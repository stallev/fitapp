import { NextResponse } from "next/server";

import {
  submitTrainerApplicationSchema,
  TRAINER_MUTATION_ERROR_CODES,
} from "@pulse/domain";

import { submitTrainerApplication } from "@/data/trainer/submit-trainer-application.server";
import { MESSAGES } from "@/lib/messages";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = submitTrainerApplicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        code: TRAINER_MUTATION_ERROR_CODES.VALIDATION,
        message: MESSAGES.trainer.onboarding.errors.termsRequired,
      },
      { status: 400 },
    );
  }

  const result = await submitTrainerApplication(parsed.data);
  if (!result.ok) {
    const message =
      result.code === TRAINER_MUTATION_ERROR_CODES.APPLICATION_INCOMPLETE
        ? MESSAGES.trainer.onboarding.errors.incomplete
        : result.code === TRAINER_MUTATION_ERROR_CODES.ALREADY_APPROVED
          ? MESSAGES.trainer.onboarding.errors.alreadyApproved
          : result.code === TRAINER_MUTATION_ERROR_CODES.VALIDATION
            ? MESSAGES.trainer.onboarding.errors.termsRequired
            : MESSAGES.trainer.onboarding.errors.generic;

    return NextResponse.json({ ...result, message }, { status: 400 });
  }

  return NextResponse.json(result, { status: 200 });
}
