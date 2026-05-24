"use server";

import {
  approveRefundInputSchema,
  REFUND_MUTATION_ERROR_CODES,
  rejectRefundInputSchema,
  type ApproveRefundInput,
  type MutationResult,
  type RejectRefundInput,
} from "@pulse/domain";

import {
  approveRefundMutation,
  rejectRefundMutation,
} from "@/data/admin/process-refund.server";
import { MESSAGES } from "@/lib/messages";

function mapRefundError(code: string): string {
  switch (code) {
    case REFUND_MUTATION_ERROR_CODES.ALREADY_PROCESSED:
      return MESSAGES.admin.refunds.alreadyProcessed;
    case REFUND_MUTATION_ERROR_CODES.VALIDATION:
      return MESSAGES.admin.refunds.adminCommentRequired;
    default:
      return MESSAGES.admin.errors.generic;
  }
}

export async function approveRefundAction(
  input: ApproveRefundInput,
): Promise<MutationResult<{ refundRequestId: string }>> {
  const parsed = approveRefundInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: REFUND_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.admin.errors.validation,
    };
  }

  const result = await approveRefundMutation(parsed.data);
  if (!result.ok) {
    return { ...result, message: mapRefundError(result.code) };
  }

  return result;
}

export async function rejectRefundAction(
  input: RejectRefundInput,
): Promise<MutationResult<{ refundRequestId: string }>> {
  const parsed = rejectRefundInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: REFUND_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.admin.refunds.adminCommentRequired,
    };
  }

  const result = await rejectRefundMutation(parsed.data);
  if (!result.ok) {
    return { ...result, message: mapRefundError(result.code) };
  }

  return result;
}
