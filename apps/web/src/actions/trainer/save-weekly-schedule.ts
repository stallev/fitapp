"use server";

import {
  SCHEDULE_MUTATION_ERROR_CODES,
  saveWeeklyScheduleInputSchema,
  type MutationResult,
  type SaveWeeklyScheduleInput,
} from "@pulse/domain";

import { upsertWeeklyScheduleWithCacheInvalidation } from "@/data/trainer/upsert-weekly-schedule.server";
import { MESSAGES } from "@/lib/messages";

function mapScheduleError(code: string): string {
  switch (code) {
    case SCHEDULE_MUTATION_ERROR_CODES.INVALID_INTERVAL:
      return MESSAGES.trainer.schedule.errors.invalidInterval;
    case SCHEDULE_MUTATION_ERROR_CODES.INTERVAL_OVERLAP:
      return MESSAGES.trainer.schedule.errors.intervalOverlap;
    case SCHEDULE_MUTATION_ERROR_CODES.INVALID_TIMEZONE:
      return MESSAGES.trainer.schedule.errors.invalidTimezone;
    case SCHEDULE_MUTATION_ERROR_CODES.UNAUTHORIZED:
      return MESSAGES.trainer.schedule.errors.unauthorized;
    case SCHEDULE_MUTATION_ERROR_CODES.FORBIDDEN:
      return MESSAGES.trainer.schedule.errors.forbidden;
    case SCHEDULE_MUTATION_ERROR_CODES.VALIDATION:
      return MESSAGES.trainer.schedule.errors.validation;
    default:
      return MESSAGES.trainer.schedule.errors.generic;
  }
}

export async function saveWeeklyScheduleAction(
  input: SaveWeeklyScheduleInput,
): Promise<MutationResult<{ profileId: string }>> {
  const parsed = saveWeeklyScheduleInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: SCHEDULE_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.trainer.schedule.errors.validation,
    };
  }

  const result = await upsertWeeklyScheduleWithCacheInvalidation(parsed.data);
  if (!result.ok) {
    return { ...result, message: mapScheduleError(result.code) };
  }

  return result;
}
