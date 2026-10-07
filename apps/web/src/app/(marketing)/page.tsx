import type { Metadata } from "next";
import { Suspense } from "react";

import { LandingAuthenticatedRedirect } from "@/components/landing/LandingAuthenticatedRedirect.server";
import { LandingFaqLazy } from "@/components/landing/LandingFaqLazy.client";
import { LandingFeaturedTrainers } from "@/components/landing/LandingFeaturedTrainers.server";
import { LandingFeaturedTrainersSkeleton } from "@/components/landing/LandingFeaturedTrainersSkeleton";
import { LandingFinalCta } from "@/components/landing/LandingFinalCta";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingFooterSkeleton } from "@/components/landing/LandingFooterSkeleton";
import { LandingForTrainers } from "@/components/landing/LandingForTrainers";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingHowItWorks } from "@/components/landing/LandingHowItWorks";
import { LandingJsonLd } from "@/components/landing/LandingJsonLd";
import { LandingNav } from "@/components/landing/LandingNav.server";
import { LandingSectionSkeleton } from "@/components/landing/LandingSectionSkeleton";
import { LandingSpecialtyPills } from "@/components/landing/LandingSpecialtyPills";
import { LandingTestimonials } from "@/components/landing/LandingTestimonials";
import { LandingTrustBarLazy } from "@/components/landing/LandingTrustBarLazy.client";
import { buildLandingMetadata } from "@/lib/landing/landing-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildLandingMetadata();
}

export default function HomePage() {
  return (
    <>
      <LandingJsonLd />
      <Suspense fallback={null}>
        <LandingAuthenticatedRedirect />
      </Suspense>
      <LandingNav />
      <LandingHero />
      <LandingTrustBarLazy />
      <Suspense fallback={<LandingSectionSkeleton />}>
        <LandingHowItWorks />
      </Suspense>
      <Suspense fallback={<LandingSectionSkeleton />}>
        <LandingSpecialtyPills />
      </Suspense>
      <Suspense fallback={<LandingFeaturedTrainersSkeleton />}>
        <LandingFeaturedTrainers />
      </Suspense>
      <Suspense fallback={<LandingSectionSkeleton />}>
        <LandingTestimonials />
      </Suspense>
      <Suspense fallback={<LandingSectionSkeleton />}>
        <LandingForTrainers />
      </Suspense>
      <LandingFaqLazy />
      <Suspense fallback={<LandingSectionSkeleton />}>
        <LandingFinalCta />
      </Suspense>
      <Suspense fallback={<LandingFooterSkeleton />}>
        <LandingFooter />
      </Suspense>
    </>
  );
}
