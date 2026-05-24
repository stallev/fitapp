import "server-only";

import {
  closeComplaintInputSchema,
  COMPLAINT_MUTATION_ERROR_CODES,
  COMPLAINT_STATUS,
  startComplaintReviewInputSchema,
  validateCloseComplaint,
  validateCloseComplaintInput,
  validateStartComplaintReview,
  type CloseComplaintInput,
  type MutationResult,
  type StartComplaintReviewInput,
} from "@pulse/domain";
import { getPrisma } from "@pulse/db";
import { assertCanManageComplaint, PolicyError } from "@pulse/policy-server";

import { MESSAGES } from "@/lib/messages";
import { getPolicySessionContext } from "@/server/auth/session-to-policy-context";

type ComplaintMutationResult = MutationResult<{ complaintId: string }>;

function mapPolicyError(error: PolicyError): ComplaintMutationResult {
  if (error.code === "UNAUTHORIZED") {
    return {
      ok: false,
      code: COMPLAINT_MUTATION_ERROR_CODES.UNAUTHORIZED,
      message: MESSAGES.admin.errors.unauthorized,
    };
  }

  return {
    ok: false,
    code: COMPLAINT_MUTATION_ERROR_CODES.FORBIDDEN,
    message: MESSAGES.admin.errors.forbidden,
  };
}

async function runStartComplaintReviewTransaction(
  actorUserId: string,
  complaintId: string,
): Promise<ComplaintMutationResult> {
  const prisma = getPrisma();

  return prisma.$transaction(async (tx) => {
    const complaint = await tx.complaint.findFirst({
      where: { id: complaintId },
      select: { status: true },
    });

    if (!complaint) {
      return {
        ok: false,
        code: COMPLAINT_MUTATION_ERROR_CODES.NOT_FOUND,
        message: MESSAGES.admin.errors.notFound,
      };
    }

    const validation = validateStartComplaintReview({ status: complaint.status });
    if (validation) {
      return {
        ok: false,
        code: COMPLAINT_MUTATION_ERROR_CODES.ALREADY_PROCESSED,
        message: MESSAGES.admin.complaints.alreadyProcessed,
      };
    }

    const updated = await tx.complaint.updateMany({
      where: { id: complaintId, status: COMPLAINT_STATUS.OPEN },
      data: { status: COMPLAINT_STATUS.IN_REVIEW },
    });

    if (updated.count === 0) {
      return {
        ok: false,
        code: COMPLAINT_MUTATION_ERROR_CODES.ALREADY_PROCESSED,
        message: MESSAGES.admin.complaints.alreadyProcessed,
      };
    }

    await tx.auditLog.create({
      data: {
        actorUserId,
        action: "complaint.review_started",
        targetType: "complaint",
        targetId: complaintId,
      },
    });

    return { ok: true, data: { complaintId } };
  });
}

async function runCloseComplaintTransaction(
  actorUserId: string,
  input: CloseComplaintInput,
): Promise<ComplaintMutationResult> {
  const prisma = getPrisma();

  return prisma.$transaction(async (tx) => {
    const complaint = await tx.complaint.findFirst({
      where: { id: input.complaintId },
      select: { status: true },
    });

    if (!complaint) {
      return {
        ok: false,
        code: COMPLAINT_MUTATION_ERROR_CODES.NOT_FOUND,
        message: MESSAGES.admin.errors.notFound,
      };
    }

    const validation = validateCloseComplaint({ status: complaint.status });
    if (validation) {
      return {
        ok: false,
        code: COMPLAINT_MUTATION_ERROR_CODES.ALREADY_PROCESSED,
        message: MESSAGES.admin.complaints.alreadyProcessed,
      };
    }

    const inputValidation = validateCloseComplaintInput({
      resolution: input.resolution,
      adminNotes: input.adminNotes,
    });
    if (inputValidation) {
      return {
        ok: false,
        code: COMPLAINT_MUTATION_ERROR_CODES.VALIDATION,
        message: MESSAGES.admin.complaints.notesRequired,
      };
    }

    const updated = await tx.complaint.updateMany({
      where: {
        id: input.complaintId,
        status: { not: COMPLAINT_STATUS.CLOSED },
      },
      data: {
        status: COMPLAINT_STATUS.CLOSED,
        resolution: input.resolution,
        adminNotes: input.adminNotes?.trim() || null,
        resolvedAt: new Date(),
        resolvedById: actorUserId,
      },
    });

    if (updated.count === 0) {
      return {
        ok: false,
        code: COMPLAINT_MUTATION_ERROR_CODES.ALREADY_PROCESSED,
        message: MESSAGES.admin.complaints.alreadyProcessed,
      };
    }

    await tx.auditLog.create({
      data: {
        actorUserId,
        action: "complaint.closed",
        targetType: "complaint",
        targetId: input.complaintId,
        metadataJson: { resolution: input.resolution },
      },
    });

    return { ok: true, data: { complaintId: input.complaintId } };
  });
}

export async function startComplaintReviewMutation(
  input: StartComplaintReviewInput,
): Promise<ComplaintMutationResult> {
  const parsed = startComplaintReviewInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: COMPLAINT_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.admin.errors.validation,
    };
  }

  const ctx = await getPolicySessionContext();
  if (!ctx) {
    return {
      ok: false,
      code: COMPLAINT_MUTATION_ERROR_CODES.UNAUTHORIZED,
      message: MESSAGES.admin.errors.unauthorized,
    };
  }

  try {
    assertCanManageComplaint(ctx);
  } catch (error) {
    if (error instanceof PolicyError) {
      return mapPolicyError(error);
    }

    throw error;
  }

  return runStartComplaintReviewTransaction(ctx.userId, parsed.data.complaintId);
}

export async function closeComplaintMutation(
  input: CloseComplaintInput,
): Promise<ComplaintMutationResult> {
  const parsed = closeComplaintInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: COMPLAINT_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.admin.errors.validation,
    };
  }

  const ctx = await getPolicySessionContext();
  if (!ctx) {
    return {
      ok: false,
      code: COMPLAINT_MUTATION_ERROR_CODES.UNAUTHORIZED,
      message: MESSAGES.admin.errors.unauthorized,
    };
  }

  try {
    assertCanManageComplaint(ctx);
  } catch (error) {
    if (error instanceof PolicyError) {
      return mapPolicyError(error);
    }

    throw error;
  }

  return runCloseComplaintTransaction(ctx.userId, parsed.data);
}
