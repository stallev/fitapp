"use server";

import {
  approveTrainerInputSchema,
  TRAINER_MUTATION_ERROR_CODES,
  type ApproveTrainerInput,
  type MutationResult,
} from "@pulse/domain";

import { approveTrainerWithCacheInvalidation } from "@/data/admin/approve-trainer.server";
import { MESSAGES } from "@/lib/messages";

function mapApproveError(code: string): string {
  switch (code) {
    case TRAINER_MUTATION_ERROR_CODES.UNAUTHORIZED:
      return MESSAGES.admin.errors.unauthorized;
    case TRAINER_MUTATION_ERROR_CODES.FORBIDDEN:
      return MESSAGES.admin.errors.forbidden;
    case TRAINER_MUTATION_ERROR_CODES.APPLICATION_INCOMPLETE:
      return MESSAGES.admin.moderation.incomplete;
    case TRAINER_MUTATION_ERROR_CODES.ALREADY_PROCESSED:
      return MESSAGES.admin.moderation.alreadyProcessed;
    default:
      return MESSAGES.admin.errors.generic;
  }
}

export async function approveTrainerAction(
  input: ApproveTrainerInput,
): Promise<MutationResult<{ trainerProfileId: string }>> {
  const parsed = approveTrainerInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: TRAINER_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.admin.errors.validation,
    };
  }

  const result = await approveTrainerWithCacheInvalidation(parsed.data);
  if (!result.ok) {
    return { ...result, message: mapApproveError(result.code) };
  }

  return result;
}
