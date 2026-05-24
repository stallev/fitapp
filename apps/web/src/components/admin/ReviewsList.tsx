import { CheckCircleIcon } from "lucide-react";

import { AdminQueueEmptyState } from "@/components/admin/AdminQueueEmptyState";
import { ReviewModerationCard } from "@/components/admin/ReviewModerationCard";
import type { ReviewModerationItem } from "@/data/admin/list-reviews-for-moderation.server";
import { MESSAGES } from "@/lib/messages";

export type ReviewsListProps = {
  reviews: ReviewModerationItem[];
  emptyMessage: string;
};

export function ReviewsList({ reviews, emptyMessage }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <AdminQueueEmptyState
        icon={CheckCircleIcon}
        variant="neutral"
        title={emptyMessage}
        description={MESSAGES.admin.shared.allClearDescription}
        className="md:col-span-2"
      />
    );
  }

  return (
    <ul className="mt-6 grid grid-cols-1 gap-2.5 md:grid-cols-2">
      {reviews.map((review) => (
        <li key={review.id} className="min-w-0">
          <ReviewModerationCard review={review} />
        </li>
      ))}
    </ul>
  );
}
