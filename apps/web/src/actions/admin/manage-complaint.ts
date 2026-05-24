"use server";

import {
  closeComplaintInputSchema,
  COMPLAINT_MUTATION_ERROR_CODES,
  startComplaintReviewInputSchema,
  type CloseComplaintInput,
  type MutationResult,
  type StartComplaintReviewInput,
} from "@pulse/domain";

import {
  closeComplaintMutation,
  startComplaintReviewMutation,
} from "@/data/admin/manage-complaint.server";
import { MESSAGES } from "@/lib/messages";

function mapComplaintError(code: string): string {
  switch (code) {
    case COMPLAINT_MUTATION_ERROR_CODES.ALREADY_PROCESSED:
      return MESSAGES.admin.complaints.alreadyProcessed;
    default:
      return MESSAGES.admin.errors.generic;
  }
}

export async function startComplaintReviewAction(
  input: StartComplaintReviewInput,
): Promise<MutationResult<{ complaintId: string }>> {
  const parsed = startComplaintReviewInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: COMPLAINT_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.admin.errors.validation,
    };
  }

  const result = await startComplaintReviewMutation(parsed.data);
  if (!result.ok) {
    return { ...result, message: mapComplaintError(result.code) };
  }

  return result;
}

export async function closeComplaintAction(
  input: CloseComplaintInput,
): Promise<MutationResult<{ complaintId: string }>> {
  const parsed = closeComplaintInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: COMPLAINT_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.admin.errors.validation,
    };
  }

  const result = await closeComplaintMutation(parsed.data);
  if (!result.ok) {
    return { ...result, message: mapComplaintError(result.code) };
  }

  return result;
}
