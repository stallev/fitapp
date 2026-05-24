"use server";

import {
  TRAINER_SERVICE_MUTATION_ERROR_CODES,
  createTrainerServiceSchema,
  type CreateTrainerServiceInput,
  type MutationResult,
} from "@pulse/domain";

import { createTrainerService } from "@/data/trainer/trainer-service-mutations.server";
import { MESSAGES } from "@/lib/messages";

function mapServiceError(code: string): string {
  switch (code) {
    case TRAINER_SERVICE_MUTATION_ERROR_CODES.VALIDATION:
      return MESSAGES.trainer.services.errors.validation;
    case TRAINER_SERVICE_MUTATION_ERROR_CODES.UNAUTHORIZED:
      return MESSAGES.trainer.services.errors.unauthorized;
    case TRAINER_SERVICE_MUTATION_ERROR_CODES.FORBIDDEN:
      return MESSAGES.trainer.services.errors.forbidden;
    default:
      return MESSAGES.trainer.services.errors.generic;
  }
}

export async function createTrainerServiceAction(
  input: CreateTrainerServiceInput,
): Promise<MutationResult<{ serviceId: string }>> {
  const parsed = createTrainerServiceSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: TRAINER_SERVICE_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.trainer.services.errors.validation,
    };
  }

  const result = await createTrainerService(parsed.data);
  if (!result.ok) {
    return { ...result, message: mapServiceError(result.code) };
  }

  return result;
}
