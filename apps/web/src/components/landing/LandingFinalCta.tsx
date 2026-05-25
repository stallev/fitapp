import { ArrowRightIcon, CheckIcon } from "lucide-react";

import { CtaBand } from "@/components/ui/CtaBand";
import { CustomLink } from "@/components/ui/CustomLink";
import { TrustFeaturePill } from "@/components/ui/TrustFeaturePill";
import { getMessages } from "@/lib/messages/server";


export async function LandingFinalCta() {
  const messages = await getMessages();
  const { final } = messages.landing;

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
          <CustomLink
            as="button"
            href="/trainers"
            variant="secondary"
            size="lg"
            className="rounded-full px-9"
          >
            {final.primaryCta}
            <ArrowRightIcon aria-hidden className="size-[18px]" />
          </CustomLink>
          <CustomLink
            as="button"
            href="/auth/register/trainer"
            variant="outline"
            size="lg"
            className="rounded-full border-primary-foreground/35 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10"
          >
            {final.secondaryCta}
          </CustomLink>
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
