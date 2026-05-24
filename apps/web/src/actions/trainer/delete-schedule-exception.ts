"use server";

import {
  deleteScheduleExceptionInputSchema,
  SCHEDULE_MUTATION_ERROR_CODES,
  type DeleteScheduleExceptionInput,
  type MutationResult,
} from "@pulse/domain";

import { deleteScheduleExceptionWithCacheInvalidation } from "@/data/trainer/delete-schedule-exception.server";
import { MESSAGES } from "@/lib/messages";

export async function deleteScheduleExceptionAction(
  input: DeleteScheduleExceptionInput,
): Promise<MutationResult<{ profileId: string }>> {
  const parsed = deleteScheduleExceptionInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: SCHEDULE_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.trainer.schedule.errors.validation,
    };
  }

  const result = await deleteScheduleExceptionWithCacheInvalidation(parsed.data);
  if (!result.ok) {
    return {
      ...result,
      message:
        result.code === SCHEDULE_MUTATION_ERROR_CODES.NOT_FOUND
          ? MESSAGES.trainer.schedule.errors.notFound
          : MESSAGES.trainer.schedule.errors.generic,
    };
  }

  return result;
}
