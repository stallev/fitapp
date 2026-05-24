"use server";

import {
  deleteReviewInputSchema,
  hideReviewInputSchema,
  REVIEW_MUTATION_ERROR_CODES,
  type DeleteReviewInput,
  type HideReviewInput,
  type MutationResult,
} from "@pulse/domain";

import {
  deleteReviewWithCacheInvalidation,
  hideReviewWithCacheInvalidation,
} from "@/data/admin/moderate-review.server";
import { MESSAGES } from "@/lib/messages";

function mapReviewError(code: string): string {
  switch (code) {
    case REVIEW_MUTATION_ERROR_CODES.ALREADY_PROCESSED:
      return MESSAGES.admin.reviews.alreadyProcessed;
    case REVIEW_MUTATION_ERROR_CODES.NOT_FOUND:
      return MESSAGES.admin.errors.notFound;
    default:
      return MESSAGES.admin.errors.generic;
  }
}

export async function hideReviewAction(
  input: HideReviewInput,
): Promise<MutationResult<{ reviewId: string; trainerProfileId: string }>> {
  const parsed = hideReviewInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: REVIEW_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.admin.errors.validation,
    };
  }

  const result = await hideReviewWithCacheInvalidation(parsed.data);
  if (!result.ok) {
    return { ...result, message: mapReviewError(result.code) };
  }

  return result;
}

export async function deleteReviewAction(
  input: DeleteReviewInput,
): Promise<MutationResult<{ reviewId: string; trainerProfileId: string }>> {
  const parsed = deleteReviewInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: REVIEW_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.admin.errors.validation,
    };
  }

  const result = await deleteReviewWithCacheInvalidation(parsed.data);
  if (!result.ok) {
    return { ...result, message: mapReviewError(result.code) };
  }

  return result;
}
