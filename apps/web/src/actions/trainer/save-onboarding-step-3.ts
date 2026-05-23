"use server";

import {
  saveOnboardingStep3Schema,
  TRAINER_MUTATION_ERROR_CODES,
  type MutationResult,
  type SaveOnboardingStep3Input,
} from "@pulse/domain";

import { saveOnboardingStep3 } from "@/data/trainer/save-trainer-onboarding-step.server";
import { getPolicySessionContext } from "@/server/auth/session-to-policy-context";
import { MESSAGES } from "@/lib/messages";

export type SaveOnboardingStep3State = MutationResult<{ profileId: string }> | null;

export async function saveOnboardingStep3Action(
  input: SaveOnboardingStep3Input,
): Promise<SaveOnboardingStep3State> {
  const ctx = await getPolicySessionContext();
  if (!ctx) {
    return {
      ok: false,
      code: TRAINER_MUTATION_ERROR_CODES.UNAUTHORIZED,
      message: MESSAGES.trainer.onboarding.errors.unauthorized,
    };
  }

  const parsed = saveOnboardingStep3Schema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: TRAINER_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.trainer.onboarding.errors.validation,
    };
  }

  const result = await saveOnboardingStep3(ctx.userId, parsed.data);
  if (!result.ok) {
    return {
      ...result,
      message: MESSAGES.trainer.onboarding.errors.generic,
    };
  }

  return result;
}
