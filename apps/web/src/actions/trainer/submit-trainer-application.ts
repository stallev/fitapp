"use server";

import {
  submitTrainerApplicationSchema,
  TRAINER_MUTATION_ERROR_CODES,
  type MutationResult,
} from "@pulse/domain";

import { submitTrainerApplicationWithRedirect } from "@/data/trainer/submit-trainer-application.server";
import { MESSAGES } from "@/lib/messages";

export type SubmitTrainerApplicationFormState =
  | MutationResult<{ profileId: string }>
  | null;

function mapSubmitError(code: string): string {
  switch (code) {
    case TRAINER_MUTATION_ERROR_CODES.APPLICATION_INCOMPLETE:
      return MESSAGES.trainer.onboarding.errors.incomplete;
    case TRAINER_MUTATION_ERROR_CODES.ALREADY_APPROVED:
      return MESSAGES.trainer.onboarding.errors.alreadyApproved;
    case TRAINER_MUTATION_ERROR_CODES.VALIDATION:
      return MESSAGES.trainer.onboarding.errors.termsRequired;
    default:
      return MESSAGES.trainer.onboarding.errors.generic;
  }
}

export async function submitTrainerApplicationAction(
  _prevState: SubmitTrainerApplicationFormState,
  formData: FormData,
): Promise<SubmitTrainerApplicationFormState> {
  const acceptedTerms = formData.get("acceptedTerms") === "on";

  const parsed = submitTrainerApplicationSchema.safeParse({
    acceptedTerms: acceptedTerms ? true : undefined,
  });

  if (!parsed.success) {
    return {
      ok: false,
      code: TRAINER_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.trainer.onboarding.errors.termsRequired,
    };
  }

  const result = await submitTrainerApplicationWithRedirect(parsed.data);
  if (!result.ok) {
    return {
      ...result,
      message: mapSubmitError(result.code),
    };
  }

  return result;
}
