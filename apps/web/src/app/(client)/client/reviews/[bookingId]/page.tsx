import type { Metadata } from "next";

import { Heading } from "@/components/atoms";
import { ReviewBookingContext } from "@/components/client/ReviewBookingContext";
import { ReviewForm } from "@/components/client/ReviewForm.client";
import { requireClientReviewFormContext } from "@/data/client/get-client-review-form.server";
import { MESSAGES } from "@/lib/messages";

type ClientReviewPageProps = {
  params: Promise<{ bookingId: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: MESSAGES.review.metaTitle,
  };
}

export default async function ClientReviewPage({ params }: ClientReviewPageProps) {
  const { bookingId } = await params;
  const context = await requireClientReviewFormContext(bookingId);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 py-4 pb-6">
      <Heading as="h1" visualLevel="h2">
        {MESSAGES.review.heading}
      </Heading>
      <ReviewBookingContext context={context} />
      <ReviewForm bookingId={context.bookingId} />
    </div>
  );
}
