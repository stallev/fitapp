import Link from "next/link";
import { ArrowRightIcon, CheckIcon, LockIcon, ShieldIcon, StarIcon } from "lucide-react";

import { ContentText, Heading, SectionEyebrow } from "@/components/atoms";
import { LandingHeroFloatCard } from "@/components/landing/LandingHeroFloatCard";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/Reveal.client";
import { TrustFeaturePill } from "@/components/ui/TrustFeaturePill";
import { LANDING_HERO_FLOAT_CARDS } from "@/lib/landing/landing-hero-float-cards";
import { MESSAGES } from "@/lib/messages";

const TRUST_PILL_ICONS = {
  check: CheckIcon,
  lock: LockIcon,
} as const;

export function LandingHero() {
  const { hero } = MESSAGES.landing;

  return (
    <section
      aria-labelledby="landing-hero-heading"
      className="relative flex min-h-screen items-center overflow-hidden pt-[72px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 -right-48 size-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(228,240,232,0.7)_0%,transparent_65%)]"
      />
      <Container
        variant="marketing"
        className="grid w-full items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div>
          <Reveal className="mb-7">
            <SectionEyebrow tone="outline" className="inline-flex items-center gap-1.5 text-[13px] font-medium normal-case tracking-normal">
              <ShieldIcon aria-hidden className="size-3.5" />
              {hero.eyebrow}
            </SectionEyebrow>
          </Reveal>
          <Reveal delay="100ms">
            <Heading
              as="h1"
              id="landing-hero-heading"
              visualLevel="display"
              className="mb-6 text-[clamp(3.125rem,5.8vw,5.125rem)] leading-[0.97] tracking-[-0.045em]"
            >
              {hero.title}
              <br />
              <em className="text-primary not-italic">{hero.titleAccent}</em>
            </Heading>
          </Reveal>
          <Reveal delay="200ms">
            <ContentText variant="lead" as="p" className="mb-10 max-w-[460px]">
              {hero.subcopy}
            </ContentText>
          </Reveal>
          <Reveal delay="300ms" className="mb-5 flex flex-wrap items-center gap-3.5">
            <Button asChild size="lg" className="rounded-full px-9">
              <Link href="/trainers">
                {hero.primaryCta}
                <ArrowRightIcon aria-hidden className="size-[18px]" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link href="/auth/register/trainer">{hero.secondaryCta}</Link>
            </Button>
          </Reveal>
          <Reveal delay="400ms" className="mb-6 flex flex-wrap gap-2.5">
            {hero.trustPills.map((pill) => {
              const Icon = TRUST_PILL_ICONS[pill.kind];
              return (
                <TrustFeaturePill key={pill.label} icon={Icon}>
                  {pill.label}
                </TrustFeaturePill>
              );
            })}
          </Reveal>
          <Reveal delay="500ms" className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              <StarIcon aria-hidden className="size-[15px] fill-secondary text-secondary" />
              {hero.stats.rating} {hero.stats.ratingLabel}
            </span>
            <span aria-hidden className="size-1 rounded-full bg-border" />
            <ContentText variant="subtle" as="span" className="text-sm font-medium">
              {hero.stats.trainers}
            </ContentText>
            <span aria-hidden className="size-1 rounded-full bg-border" />
            <ContentText variant="subtle" as="span" className="text-sm font-medium">
              {hero.stats.sessions}
            </ContentText>
          </Reveal>
        </div>

        <Reveal delay="200ms" className="relative hidden h-[540px] lg:block">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[-60px] rounded-[60%_40%_50%_50%/50%_50%_60%_40%] bg-[radial-gradient(ellipse_75%_75%_at_55%_50%,rgba(228,240,232,0.85)_0%,transparent_65%)]"
          />
          {LANDING_HERO_FLOAT_CARDS.map((card) => (
            <LandingHeroFloatCard key={card.id} card={card} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
