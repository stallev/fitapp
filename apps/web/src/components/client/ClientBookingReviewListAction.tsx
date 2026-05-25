import { CheckIcon, StarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CustomLink } from "@/components/ui/CustomLink";
import { RatingStars } from "@/components/ui/RatingStars";

import { MESSAGES } from "@/lib/messages";

export type ClientBookingReviewListActionProps = {
  bookingId: string;
  hasReview: boolean;
  reviewRating: number | null;
};

export function ClientBookingReviewListAction({
  bookingId,
  hasReview,
  reviewRating,
}: ClientBookingReviewListActionProps) {
  if (hasReview) {
    return (
      <div className="mt-auto space-y-2 pt-3">
        <Button
          type="button"
          size="sm"
          variant="tonal"
          className="min-h-11 w-full"
          disabled
          aria-disabled
        >
          <CheckIcon className="size-3.5" aria-hidden />
          {MESSAGES.booking.reviewSubmitted.label}
        </Button>
        {reviewRating !== null ? (
          <RatingStars
            value={reviewRating}
            size="sm"
            className="justify-center"
            aria-label={MESSAGES.review.ratingLabel}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div className="mt-auto pt-3">
      <Button asChild size="sm" variant="tonal" className="min-h-11 w-full">
        <CustomLink href={`/client/reviews/${bookingId}`}>
          <StarIcon className="size-3.5" aria-hidden />
          {MESSAGES.booking.actions.leaveReview}
        </CustomLink>
      </Button>
    </div>
  );
}
