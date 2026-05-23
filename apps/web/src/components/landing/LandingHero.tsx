import Link from "next/link";

import { ContentText, Heading } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { MESSAGES } from "@/lib/messages";

export function LandingHero() {
  return (
    <section
      aria-labelledby="landing-hero-heading"
      className="flex flex-col items-center py-4 text-center md:py-8"
    >
      <Heading as="h1" visualLevel="display" id="landing-hero-heading" className="max-w-2xl">
        {MESSAGES.landing.headline}
      </Heading>
      <ContentText variant="lead" className="mt-4 max-w-xl">
        {MESSAGES.landing.subcopy}
      </ContentText>
      <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href="/trainers">{MESSAGES.landing.primaryCta}</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
          <Link href="/auth/register">{MESSAGES.landing.secondaryCta}</Link>
        </Button>
      </div>
    </section>
  );
}
