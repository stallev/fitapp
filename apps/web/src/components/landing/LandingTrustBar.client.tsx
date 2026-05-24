"use client";

import { StatsBar } from "@/components/ui/StatsBar.client";
import { getLandingTrustMetrics } from "@/lib/landing/landing-trust-metrics";
import { usePrefersReducedMotion } from "@/lib/ui/use-prefers-reduced-motion";

export function LandingTrustBar() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <StatsBar
      metrics={getLandingTrustMetrics()}
      animate={!reducedMotion}
    />
  );
}
