"use server";

import {
  publishReviewInputSchema,
  REVIEW_MUTATION_ERROR_CODES,
  type MutationResult,
} from "@pulse/domain";

import { publishReviewWithCacheInvalidation } from "@/data/client/publish-review.server";
import { MESSAGES } from "@/lib/messages";

export async function submitReviewAction(
  _prev: MutationResult<{ reviewId: string; bookingId: string }> | null,
  formData: FormData,
): Promise<MutationResult<{ reviewId: string; bookingId: string }>> {
  const parsed = publishReviewInputSchema.safeParse({
    bookingId: String(formData.get("bookingId") ?? "").trim(),
    rating: String(formData.get("rating") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
  });

  if (!parsed.success) {
    return {
      ok: false,
      code: REVIEW_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.review.errors.validation,
    };
  }

  return publishReviewWithCacheInvalidation(parsed.data);
}
