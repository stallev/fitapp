"use client";

import { RouteSegmentError } from "@/components/shell/RouteSegmentError";
import { MESSAGES } from "@/lib/messages";

export default function BookTrainerError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <RouteSegmentError
      pageTitle={MESSAGES.booking.wizard.pageTitle}
      title={MESSAGES.common.segmentError.title}
      description={MESSAGES.common.segmentError.description}
      retryLabel={MESSAGES.common.segmentError.retry}
      reset={reset}
    />
  );
}
