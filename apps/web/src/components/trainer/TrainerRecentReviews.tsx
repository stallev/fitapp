import { ContentText, SectionTitle } from "@/components/atoms";
import { PulseCard } from "@/components/ui/card";
import type { TrainerDashboardReview } from "@/data/trainer/get-trainer-dashboard.server";
import { MESSAGES } from "@/lib/messages";

export type TrainerRecentReviewsProps = {
  reviews: TrainerDashboardReview[];
};

export function TrainerRecentReviews({ reviews }: TrainerRecentReviewsProps) {
  return (
    <section className="space-y-3">
      <SectionTitle>{MESSAGES.trainer.dashboardOps.recentReviewsTitle}</SectionTitle>
      {reviews.length === 0 ? (
        <ContentText variant="muted" as="p">
          {MESSAGES.trainer.dashboardOps.recentReviewsEmpty}
        </ContentText>
      ) : (
        <div className="space-y-2">
          {reviews.map((review) => (
            <PulseCard key={review.id} className="space-y-1 p-4">
              <ContentText variant="smallEmphasis" as="p">
                {review.clientName} · ★ {review.rating}
              </ContentText>
              <ContentText variant="muted" as="p" className="line-clamp-3">
                {review.bodyPreview}
              </ContentText>
            </PulseCard>
          ))}
        </div>
      )}
    </section>
  );
}
