import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/CtaBand";
import { TrustFeaturePill } from "@/components/ui/TrustFeaturePill";
import { MESSAGES } from "@/lib/messages";

export function LandingFinalCta() {
  const { final } = MESSAGES.landing;

  return (
    <CtaBand
      eyebrow={final.eyebrow}
      title={
        <>
          {final.title}{" "}
          <em className="text-[hsl(var(--color-secondary-light))] not-italic">
            {final.titleAccent}
          </em>
        </>
      }
      description={final.description}
      actions={
        <>
          <Button asChild size="lg" variant="secondary" className="rounded-full px-9">
            <Link href="/trainers">
              {final.primaryCta}
              <ArrowRightIcon aria-hidden className="size-[18px]" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-primary-foreground/35 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Link href="/auth/register/trainer">{final.secondaryCta}</Link>
          </Button>
        </>
      }
      footnotes={
        <>
          {final.footnotes.map((note) => (
            <TrustFeaturePill
              key={note}
              icon={CheckIcon}
              className="border-primary-foreground/20 bg-transparent text-primary-foreground/60 shadow-none"
            >
              {note}
            </TrustFeaturePill>
          ))}
        </>
      }
    />
  );
}
