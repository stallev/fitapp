"use server";

import {
  TRAINER_SERVICE_MUTATION_ERROR_CODES,
  updateTrainerServiceSchema,
  type MutationResult,
  type UpdateTrainerServiceInput,
} from "@pulse/domain";

import { updateTrainerService } from "@/data/trainer/trainer-service-mutations.server";
import { MESSAGES } from "@/lib/messages";

function mapServiceError(code: string): string {
  switch (code) {
    case TRAINER_SERVICE_MUTATION_ERROR_CODES.VALIDATION:
      return MESSAGES.trainer.services.errors.validation;
    case TRAINER_SERVICE_MUTATION_ERROR_CODES.NOT_FOUND:
      return MESSAGES.trainer.services.errors.notFound;
    case TRAINER_SERVICE_MUTATION_ERROR_CODES.UNAUTHORIZED:
      return MESSAGES.trainer.services.errors.unauthorized;
    case TRAINER_SERVICE_MUTATION_ERROR_CODES.FORBIDDEN:
      return MESSAGES.trainer.services.errors.forbidden;
    default:
      return MESSAGES.trainer.services.errors.generic;
  }
}

export async function updateTrainerServiceAction(
  input: UpdateTrainerServiceInput,
): Promise<MutationResult<{ serviceId: string }>> {
  const parsed = updateTrainerServiceSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: TRAINER_SERVICE_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.trainer.services.errors.validation,
    };
  }

  const result = await updateTrainerService(parsed.data);
  if (!result.ok) {
    return { ...result, message: mapServiceError(result.code) };
  }

  return result;
}
