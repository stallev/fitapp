import type { Metadata } from "next";
import { Suspense } from "react";

import { FeaturedTrainersSkeleton } from "@/components/landing/FeaturedTrainersSkeleton";
import { LandingAuthenticatedRedirect } from "@/components/landing/LandingAuthenticatedRedirect.server";
import { LandingCategoryChips } from "@/components/landing/LandingCategoryChips";
import { LandingFeaturedTrainers } from "@/components/landing/LandingFeaturedTrainers.server";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingValueProps } from "@/components/landing/LandingValueProps";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { Container } from "@/components/ui/container";
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
      <Container variant="page" className="space-y-12 py-8 md:py-12">
        <LandingHero />
        <LandingValueProps />
        <LandingCategoryChips />
        <Suspense fallback={<FeaturedTrainersSkeleton />}>
          <LandingFeaturedTrainers />
        </Suspense>
      </Container>
      <SiteFooter />
    </>
  );
}

