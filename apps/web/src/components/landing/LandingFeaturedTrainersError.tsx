import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FeaturedTrainersRetryButton } from "@/components/landing/FeaturedTrainersRetryButton.client";
import { MESSAGES } from "@/lib/messages";

export function LandingFeaturedTrainersError() {
  return (
    <section aria-labelledby="landing-featured-heading" className="space-y-4">
      <h2 id="landing-featured-heading" className="sr-only">
        {MESSAGES.landing.featured.title}
      </h2>
      <Alert variant="destructive">
        <AlertCircleIcon aria-hidden />
        <AlertTitle>{MESSAGES.landing.featured.error.title}</AlertTitle>
        <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span>{MESSAGES.landing.featured.error.description}</span>
          <FeaturedTrainersRetryButton />
        </AlertDescription>
      </Alert>
    </section>
  );
}
