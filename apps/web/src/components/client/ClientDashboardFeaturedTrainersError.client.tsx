"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { ContentText } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";

import { MESSAGES } from "@/lib/messages";

export function ClientDashboardFeaturedTrainersError() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <section>
      <SectionHeader title={MESSAGES.dashboard.client.topTrainersTitle} />
      <ContentText variant="muted" as="p">
        {MESSAGES.dashboard.client.topTrainersError}
      </ContentText>
      <Button
        type="button"
        variant="outline"
        className="mt-3 min-h-11"
        disabled={pending}
        aria-busy={pending}
        onClick={handleRetry}
      >
        {pending
          ? MESSAGES.landing.featured.error.retrying
          : MESSAGES.common.segmentError.retry}
      </Button>
    </section>
  );
}
