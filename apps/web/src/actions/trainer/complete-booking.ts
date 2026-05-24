"use server";

import {
  BOOKING_MUTATION_ERROR_CODES,
  completeBookingInputSchema,
  type CompleteBookingInput,
  type MutationResult,
} from "@pulse/domain";

import { completeBookingWithCacheInvalidation } from "@/data/trainer/complete-booking.server";
import { MESSAGES } from "@/lib/messages";

function mapCompleteError(code: string): string {
  switch (code) {
    case BOOKING_MUTATION_ERROR_CODES.UNAUTHORIZED:
      return MESSAGES.booking.errors.unauthorized;
    case BOOKING_MUTATION_ERROR_CODES.FORBIDDEN:
      return MESSAGES.booking.errors.forbidden;
    case BOOKING_MUTATION_ERROR_CODES.BOOKING_STATE_CONFLICT:
      return MESSAGES.booking.errors.stateConflict;
    case BOOKING_MUTATION_ERROR_CODES.BOOKING_TERMINAL:
    case BOOKING_MUTATION_ERROR_CODES.INVALID_STATUS_TRANSITION:
      return MESSAGES.booking.errors.terminal;
    default:
      return MESSAGES.trainer.clients.errors.generic;
  }
}

export async function completeBookingAction(
  input: CompleteBookingInput,
): Promise<MutationResult<{ id: string; status: string }>> {
  const parsed = completeBookingInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: BOOKING_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.booking.errors.validation,
    };
  }

  const result = await completeBookingWithCacheInvalidation(parsed.data);
  if (!result.ok) {
    return { ...result, message: mapCompleteError(result.code) };
  }

  return result;
}
