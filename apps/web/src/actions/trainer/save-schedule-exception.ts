"use server";

import {
  SCHEDULE_MUTATION_ERROR_CODES,
  scheduleExceptionInputSchema,
  type MutationResult,
  type ScheduleExceptionInput,
} from "@pulse/domain";

import { upsertScheduleExceptionWithCacheInvalidation } from "@/data/trainer/upsert-schedule-exception.server";
import { MESSAGES } from "@/lib/messages";

export async function saveScheduleExceptionAction(
  input: ScheduleExceptionInput,
): Promise<MutationResult<{ profileId: string; exceptionId: string }>> {
  const parsed = scheduleExceptionInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: SCHEDULE_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.trainer.schedule.errors.validation,
    };
  }

  const result = await upsertScheduleExceptionWithCacheInvalidation(parsed.data);
  if (!result.ok) {
    return {
      ...result,
      message: MESSAGES.trainer.schedule.errors.generic,
    };
  }

  return result;
}
