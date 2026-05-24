import { ReviewsList } from "@/components/admin/ReviewsList";
import { listReviewsForModeration } from "@/data/admin/list-reviews-for-moderation.server";
import {
  REVIEW_MODERATION_TABS,
  type ReviewModerationTab,
} from "@/lib/admin/review-moderation-tabs";
import { MESSAGES } from "@/lib/messages";

export type ReviewsTabPanelProps = {
  tab: ReviewModerationTab;
};

export async function ReviewsTabPanel({ tab }: ReviewsTabPanelProps) {
  const tabConfig = REVIEW_MODERATION_TABS.find((entry) => entry.value === tab);
  const reviews = await listReviewsForModeration({
    isHidden: tabConfig?.isHidden ?? false,
  });

  return (
    <ReviewsList
      reviews={reviews}
      emptyMessage={tabConfig?.emptyMessage ?? MESSAGES.admin.reviews.empty}
    />
  );
}
