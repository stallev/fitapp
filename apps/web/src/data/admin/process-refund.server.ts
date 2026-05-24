import "server-only";

import {
  approveRefundInputSchema,
  REFUND_MUTATION_ERROR_CODES,
  REFUND_STATUS,
  rejectRefundInputSchema,
  validateProcessRefund,
  type ApproveRefundInput,
  type MutationResult,
  type RejectRefundInput,
} from "@pulse/domain";
import { getPrisma } from "@pulse/db";
import { assertCanProcessRefund, PolicyError } from "@pulse/policy-server";

import { MESSAGES } from "@/lib/messages";
import { getPolicySessionContext } from "@/server/auth/session-to-policy-context";

type RefundMutationResult = MutationResult<{ refundRequestId: string }>;

function mapPolicyError(error: PolicyError): RefundMutationResult {
  if (error.code === "UNAUTHORIZED") {
    return {
      ok: false,
      code: REFUND_MUTATION_ERROR_CODES.UNAUTHORIZED,
      message: MESSAGES.admin.errors.unauthorized,
    };
  }

  return {
    ok: false,
    code: REFUND_MUTATION_ERROR_CODES.FORBIDDEN,
    message: MESSAGES.admin.errors.forbidden,
  };
}

async function runProcessRefundTransaction(
  actorUserId: string,
  refundRequestId: string,
  status: typeof REFUND_STATUS.APPROVED | typeof REFUND_STATUS.REJECTED,
  adminComment?: string,
): Promise<RefundMutationResult> {
  const prisma = getPrisma();

  return prisma.$transaction(async (tx) => {
    const refund = await tx.refundRequest.findFirst({
      where: { id: refundRequestId },
      select: { status: true },
    });

    if (!refund) {
      return {
        ok: false,
        code: REFUND_MUTATION_ERROR_CODES.NOT_FOUND,
        message: MESSAGES.admin.errors.notFound,
      };
    }

    const validation = validateProcessRefund({ status: refund.status });
    if (validation) {
      return {
        ok: false,
        code: REFUND_MUTATION_ERROR_CODES.ALREADY_PROCESSED,
        message: MESSAGES.admin.refunds.alreadyProcessed,
      };
    }

    const updated = await tx.refundRequest.updateMany({
      where: { id: refundRequestId, status: REFUND_STATUS.PENDING },
      data: {
        status,
        adminComment: adminComment ?? null,
        processedAt: new Date(),
        processedById: actorUserId,
      },
    });

    if (updated.count === 0) {
      return {
        ok: false,
        code: REFUND_MUTATION_ERROR_CODES.ALREADY_PROCESSED,
        message: MESSAGES.admin.refunds.alreadyProcessed,
      };
    }

    await tx.auditLog.create({
      data: {
        actorUserId,
        action: status === REFUND_STATUS.APPROVED ? "refund.approved" : "refund.rejected",
        targetType: "refund_request",
        targetId: refundRequestId,
      },
    });

    return { ok: true, data: { refundRequestId } };
  });
}

export async function approveRefundMutation(
  input: ApproveRefundInput,
): Promise<RefundMutationResult> {
  const parsed = approveRefundInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: REFUND_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.admin.errors.validation,
    };
  }

  const ctx = await getPolicySessionContext();
  if (!ctx) {
    return {
      ok: false,
      code: REFUND_MUTATION_ERROR_CODES.UNAUTHORIZED,
      message: MESSAGES.admin.errors.unauthorized,
    };
  }

  try {
    assertCanProcessRefund(ctx);
  } catch (error) {
    if (error instanceof PolicyError) {
      return mapPolicyError(error);
    }

    throw error;
  }

  return runProcessRefundTransaction(
    ctx.userId,
    parsed.data.refundRequestId,
    REFUND_STATUS.APPROVED,
    parsed.data.adminComment,
  );
}

export async function rejectRefundMutation(
  input: RejectRefundInput,
): Promise<RefundMutationResult> {
  const parsed = rejectRefundInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: REFUND_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.admin.refunds.adminCommentRequired,
    };
  }

  const ctx = await getPolicySessionContext();
  if (!ctx) {
    return {
      ok: false,
      code: REFUND_MUTATION_ERROR_CODES.UNAUTHORIZED,
      message: MESSAGES.admin.errors.unauthorized,
    };
  }

  try {
    assertCanProcessRefund(ctx);
  } catch (error) {
    if (error instanceof PolicyError) {
      return mapPolicyError(error);
    }

    throw error;
  }

  return runProcessRefundTransaction(
    ctx.userId,
    parsed.data.refundRequestId,
    REFUND_STATUS.REJECTED,
    parsed.data.adminComment,
  );
}
