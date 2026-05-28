import { ArrowRightIcon, CheckIcon, LockIcon, ShieldIcon, StarIcon } from "lucide-react";

import { ContentText, Heading, SectionEyebrow } from "@/components/atoms";
import { LandingHeroFloatCard } from "@/components/landing/LandingHeroFloatCard";
import { Container } from "@/components/ui/container";
import { CustomLink } from "@/components/ui/CustomLink";
import { Reveal } from "@/components/ui/Reveal.client";
import { TrustFeaturePill } from "@/components/ui/TrustFeaturePill";
import type { LandingHeroFloatCardData } from "@/lib/landing/landing-hero-float-cards";
import type { Messages } from "@/lib/messages/types";

const TRUST_PILL_ICONS = {
  check: CheckIcon,
  lock: LockIcon,
} as const;

type LandingHeroProps = {
  hero: Messages["landing"]["hero"];
  floatCards: LandingHeroFloatCardData[];
};

export function LandingHero({ hero, floatCards }: LandingHeroProps) {
  return (
    <section
      aria-labelledby="landing-hero-heading"
      className="relative flex min-h-screen shrink-0 items-center overflow-hidden pt-14 md:pt-[72px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 -right-48 size-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--color-hero-glow)/0.45)_0%,transparent_65%)]"
      />
      <Container
        variant="marketing"
        className="grid w-full items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="min-w-0">
          <div className="mb-7">
            <SectionEyebrow tone="outline" className="inline-flex items-center gap-1.5 text-[13px] font-medium normal-case tracking-normal">
              <ShieldIcon aria-hidden className="size-3.5" />
              {hero.eyebrow}
            </SectionEyebrow>
          </div>
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
          <ContentText variant="lead" as="p" className="mb-10 max-w-[460px]">
            {hero.subcopy}
          </ContentText>
          <div className="mb-5 flex flex-wrap items-center gap-3.5">
            <CustomLink as="button" href="/trainers" size="lg" className="rounded-full px-9">
              {hero.primaryCta}
              <ArrowRightIcon aria-hidden className="size-[18px]" />
            </CustomLink>
            <CustomLink
              as="button"
              href="/auth/register/trainer"
              variant="outline"
              size="lg"
              className="rounded-full px-8"
            >
              {hero.secondaryCta}
            </CustomLink>
          </div>
          <div className="mb-6 flex flex-wrap gap-2.5">
            {hero.trustPills.map((pill) => {
              const Icon =
                TRUST_PILL_ICONS[pill.kind as keyof typeof TRUST_PILL_ICONS];
              return (
                <TrustFeaturePill key={pill.label} icon={Icon}>
                  {pill.label}
                </TrustFeaturePill>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              <StarIcon aria-hidden className="size-[15px] fill-secondary text-secondary" />
              {hero.stats.rating} {hero.stats.ratingLabel}
            </span>
            <span aria-hidden className="size-1 rounded-full bg-border" />
            <ContentText variant="bodyMuted" as="span" className="text-sm font-medium">
              {hero.stats.trainers}
            </ContentText>
            <span aria-hidden className="size-1 rounded-full bg-border" />
            <ContentText variant="bodyMuted" as="span" className="text-sm font-medium">
              {hero.stats.sessions}
            </ContentText>
          </div>
        </div>

        <div className="relative mx-auto hidden h-[540px] min-h-[540px] w-full min-w-[365px] max-w-[400px] shrink-0 lg:block">
          <Reveal
            delay="200ms"
            className="pointer-events-none absolute inset-[-60px] rounded-[60%_40%_50%_50%/50%_50%_60%_40%] bg-[radial-gradient(ellipse_75%_75%_at_55%_50%,hsl(var(--color-hero-glow)/0.35)_0%,transparent_65%)] motion-reduce:opacity-100"
            aria-hidden
          />
          {floatCards.map((card) => (
            <LandingHeroFloatCard key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}
