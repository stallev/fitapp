import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Container } from "@/components/ui/container";
import { MarketingSectionHeader } from "@/components/ui/MarketingSectionHeader";
import { MESSAGES } from "@/lib/messages";

import { LandingFeaturedTrainersRetryButton } from "./LandingFeaturedTrainersRetryButton.client";

export function LandingFeaturedTrainersError() {
  const { featured } = MESSAGES.landing;

  return (
    <section id="trainers" className="bg-card py-24">
      <Container variant="marketing">
        <MarketingSectionHeader
          label={featured.label}
          title={featured.title}
          subtitle={featured.subtitle}
        />
        <Alert variant="destructive">
          <AlertCircleIcon aria-hidden />
          <AlertTitle>{featured.error.title}</AlertTitle>
          <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span>{featured.error.description}</span>
            <LandingFeaturedTrainersRetryButton />
          </AlertDescription>
        </Alert>
      </Container>
    </section>
  );
}
