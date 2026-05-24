"use server";

import {
  COMPLAINT_MUTATION_ERROR_CODES,
  fileComplaintInputSchema,
  type FileComplaintInput,
  type MutationResult,
} from "@pulse/domain";

import { fileComplaintMutation } from "@/data/client/file-complaint.server";
import { MESSAGES } from "@/lib/messages";

export async function fileComplaintAction(
  input: FileComplaintInput,
): Promise<MutationResult<{ complaintId: string }>> {
  const parsed = fileComplaintInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: COMPLAINT_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.clientComplaint.errors.validation,
    };
  }

  return fileComplaintMutation(parsed.data);
}
