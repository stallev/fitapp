import type { Metadata } from "next";
import { Suspense } from "react";

import { LandingAuthenticatedRedirect } from "@/components/landing/LandingAuthenticatedRedirect.server";
import { LandingFaq } from "@/components/landing/LandingFaq.client";
import { LandingFeaturedTrainers } from "@/components/landing/LandingFeaturedTrainers.server";
import { LandingFeaturedTrainersSkeleton } from "@/components/landing/LandingFeaturedTrainersSkeleton";
import { LandingFinalCta } from "@/components/landing/LandingFinalCta";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingFooterSkeleton } from "@/components/landing/LandingFooterSkeleton";
import { LandingForTrainers } from "@/components/landing/LandingForTrainers";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingHowItWorks } from "@/components/landing/LandingHowItWorks";
import { LandingNav } from "@/components/landing/LandingNav.client";
import { LandingSpecialtyPills } from "@/components/landing/LandingSpecialtyPills";
import { LandingTestimonials } from "@/components/landing/LandingTestimonials";
import { LandingTrustBar } from "@/components/landing/LandingTrustBar.client";
import { MESSAGES } from "@/lib/messages";

export function generateMetadata(): Metadata {
  return {
    title: MESSAGES.landing.meta.title,
    description: MESSAGES.landing.meta.description,
  };
}

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <LandingAuthenticatedRedirect />
      </Suspense>
      <LandingNav />
      <LandingHero />
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
