import { ContentText } from "@/components/atoms";
import { PulseCard } from "@/components/ui/card";
import { RatingStars } from "@/components/ui/RatingStars";

import type { ClientBookingReviewSummary } from "@/data/client/get-client-booking-detail.server";
import { MESSAGES } from "@/lib/messages";

export type ClientBookingReviewSubmittedProps = {
  review: ClientBookingReviewSummary;
};

export function ClientBookingReviewSubmitted({
  review,
}: ClientBookingReviewSubmittedProps) {
  return (
    <PulseCard className="space-y-3 rounded-2xl p-5">
      <ContentText variant="blockLabel" as="p">
        {MESSAGES.booking.reviewSubmitted.heading}
      </ContentText>
      <RatingStars
        value={review.rating}
        size="sm"
        aria-label={MESSAGES.review.ratingLabel}
      />
      <ContentText variant="small" as="p">
        {review.body}
      </ContentText>
      <ContentText variant="mutedMicro" as="p">
        {MESSAGES.booking.reviewSubmitted.disclaimer}
      </ContentText>
    </PulseCard>
  );
}
