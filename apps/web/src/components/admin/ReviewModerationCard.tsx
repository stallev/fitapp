import { ContentText } from "@/components/atoms";
import { ReviewModerationActions } from "@/components/admin/ReviewModerationActions.client";
import { PulseCard, PulseCardContent } from "@/components/ui/card";
import { RatingStars } from "@/components/ui/RatingStars";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ReviewModerationItem } from "@/data/admin/list-reviews-for-moderation.server";
import { formatAdminRelativeDate } from "@/lib/date/format-admin-relative";
import { MESSAGES } from "@/lib/messages";

export type ReviewModerationCardProps = {
  review: ReviewModerationItem;
};

export function ReviewModerationCard({ review }: ReviewModerationCardProps) {
  return (
    <PulseCard variant="base" className="h-full rounded-2xl">
      <PulseCardContent density="sm" className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <ContentText as="span" className="font-medium">
            {review.clientName}
          </ContentText>
          <ContentText as="span" className="text-sm text-muted-foreground">
            → {review.trainerName}
          </ContentText>
          <RatingStars value={review.rating} size="sm" />
          <ContentText as="span" className="text-[11.5px] text-muted-foreground">
            · {formatAdminRelativeDate(review.createdAt)}
          </ContentText>
          <StatusBadge status={review.isHidden ? "cancelled" : "verified"}>
            {review.isHidden
              ? MESSAGES.admin.reviews.hidden
              : MESSAGES.admin.reviews.visible}
          </StatusBadge>
        </div>

        <ContentText as="p" className="line-clamp-3 text-sm">
          {review.body}
        </ContentText>

        <ReviewModerationActions
          reviewId={review.id}
          isHidden={review.isHidden}
        />
      </PulseCardContent>
    </PulseCard>
  );
}
