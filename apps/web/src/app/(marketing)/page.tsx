import { Suspense } from "react";

import { LandingAuthenticatedRedirect } from "@/components/landing/LandingAuthenticatedRedirect.server";
import {
  LandingHomeAboveFold,
  LandingHomeAboveFoldFallback,
} from "@/components/landing/LandingHomeAboveFold.server";
import { LandingPageRest } from "@/components/landing/LandingPageRest.server";
import { buildLandingMetadata } from "@/lib/landing/landing-metadata";

export async function generateMetadata() {
  return buildLandingMetadata();
}

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <LandingAuthenticatedRedirect />
      </Suspense>
      <Suspense fallback={<LandingHomeAboveFoldFallback />}>
        <LandingHomeAboveFold />
      </Suspense>
      <Suspense fallback={null}>
        <LandingPageRest />
      </Suspense>
    </>
  );
}
