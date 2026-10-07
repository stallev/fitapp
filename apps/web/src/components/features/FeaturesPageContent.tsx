import dynamic from "next/dynamic";
import { Suspense } from "react";

import { FeaturesBoundaries } from "@/components/features/FeaturesBoundaries";
import { FeaturesCta } from "@/components/features/FeaturesCta";
import { FeaturesDemoPaths } from "@/components/features/FeaturesDemoPaths";
import { FeaturesHero } from "@/components/features/FeaturesHero";
import { FeaturesRoleSection } from "@/components/features/FeaturesRoleSection";
import { FeaturesTocProvider } from "@/components/features/FeaturesToc.client";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingFooterSkeleton } from "@/components/landing/LandingFooterSkeleton";
import { MarketingNav } from "@/components/landing/MarketingNav.server";
import { Container } from "@/components/ui/container";

const FeaturesTocMobile = dynamic(
  () =>
    import("@/components/features/FeaturesToc.client").then((module) => ({
      default: module.FeaturesTocMobile,
    })),
);

const FeaturesTocDesktop = dynamic(
  () =>
    import("@/components/features/FeaturesToc.client").then((module) => ({
      default: module.FeaturesTocDesktop,
    })),
);

function FeaturesTocSections() {
  return (
    <FeaturesTocProvider>
      <Container variant="marketing" className="pb-12 md:pb-16">
        <FeaturesTocMobile />
        <div className="grid gap-12 pt-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 lg:pt-12">
          <FeaturesTocDesktop />
          <div className="min-w-0 space-y-16 md:space-y-20">
            <FeaturesRoleSection sectionKey="shared" />
            <FeaturesRoleSection sectionKey="client" />
            <FeaturesRoleSection sectionKey="trainer" />
            <FeaturesRoleSection sectionKey="admin" />
            <FeaturesDemoPaths />
            <FeaturesBoundaries />
          </div>
        </div>
      </Container>
    </FeaturesTocProvider>
  );
}

export function FeaturesPageContent() {
  return (
    <>
      <MarketingNav />
      <FeaturesHero />
      <FeaturesTocSections />
      <FeaturesCta />
      <Suspense fallback={<LandingFooterSkeleton />}>
        <LandingFooter />
      </Suspense>
    </>
  );
}
