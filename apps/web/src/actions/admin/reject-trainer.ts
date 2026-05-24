"use server";

import {
  rejectTrainerInputSchema,
  TRAINER_MUTATION_ERROR_CODES,
  type MutationResult,
  type RejectTrainerInput,
} from "@pulse/domain";

import { rejectTrainerWithCacheInvalidation } from "@/data/admin/reject-trainer.server";
import { MESSAGES } from "@/lib/messages";

function mapRejectError(code: string): string {
  switch (code) {
    case TRAINER_MUTATION_ERROR_CODES.UNAUTHORIZED:
      return MESSAGES.admin.errors.unauthorized;
    case TRAINER_MUTATION_ERROR_CODES.FORBIDDEN:
      return MESSAGES.admin.errors.forbidden;
    case TRAINER_MUTATION_ERROR_CODES.ALREADY_PROCESSED:
      return MESSAGES.admin.moderation.alreadyProcessed;
    case TRAINER_MUTATION_ERROR_CODES.VALIDATION:
      return MESSAGES.admin.moderation.rejectionReasonRequired;
    default:
      return MESSAGES.admin.errors.generic;
  }
}

export async function rejectTrainerAction(
  input: RejectTrainerInput,
): Promise<MutationResult<{ trainerProfileId: string }>> {
  const parsed = rejectTrainerInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: TRAINER_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.admin.moderation.rejectionReasonRequired,
    };
  }

  const result = await rejectTrainerWithCacheInvalidation(parsed.data);
  if (!result.ok) {
    return { ...result, message: mapRejectError(result.code) };
  }

  return result;
}
