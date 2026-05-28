import { Suspense } from "react";

import { LandingFaq } from "@/components/landing/LandingFaq.client";
import { LandingFeaturedTrainers } from "@/components/landing/LandingFeaturedTrainers.server";
import { LandingFeaturedTrainersSkeleton } from "@/components/landing/LandingFeaturedTrainersSkeleton";
import { LandingFinalCta } from "@/components/landing/LandingFinalCta";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingFooterSkeleton } from "@/components/landing/LandingFooterSkeleton";
import { LandingForTrainers } from "@/components/landing/LandingForTrainers";
import { LandingHowItWorks } from "@/components/landing/LandingHowItWorks";
import { LandingSpecialtyPills } from "@/components/landing/LandingSpecialtyPills";
import { LandingTestimonials } from "@/components/landing/LandingTestimonials";
import { LandingTrustBar } from "@/components/landing/LandingTrustBar.client";

export async function LandingPageRest() {
  return (
    <>
      <LandingTrustBar />
      <LandingHowItWorks />
      <LandingSpecialtyPills />
      <Suspense fallback={<LandingFeaturedTrainersSkeleton />}>
        <LandingFeaturedTrainers />
      </Suspense>
      <LandingTestimonials />
      <LandingForTrainers />
      <LandingFaq />
      <LandingFinalCta />
      <Suspense fallback={<LandingFooterSkeleton />}>
        <LandingFooter />
      </Suspense>
    </>
  );
}
