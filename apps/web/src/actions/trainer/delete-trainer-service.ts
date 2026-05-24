"use server";

import {
  TRAINER_SERVICE_MUTATION_ERROR_CODES,
  type MutationResult,
} from "@pulse/domain";

import { deleteTrainerService } from "@/data/trainer/trainer-service-mutations.server";
import { MESSAGES } from "@/lib/messages";

function mapDeleteError(code: string): string {
  switch (code) {
    case TRAINER_SERVICE_MUTATION_ERROR_CODES.SERVICE_HAS_BOOKINGS:
      return MESSAGES.trainer.services.deleteHasBookings;
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

export async function deleteTrainerServiceAction(
  serviceId: string,
): Promise<MutationResult<Record<string, never>>> {
  const result = await deleteTrainerService(serviceId);
  if (!result.ok) {
    return { ...result, message: mapDeleteError(result.code) };
  }

  return result;
}
