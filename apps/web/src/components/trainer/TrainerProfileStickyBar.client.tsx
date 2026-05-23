"use client";

import Link from "next/link";

import { ContentText } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import type { PublicTrainerProfile } from "@/lib/trainer/trainer-profile";
import { cn } from "@/lib/utils";
import { MESSAGES } from "@/lib/messages";

export type TrainerProfileStickyBarProps = {
  profile: PublicTrainerProfile;
  isAuthenticated: boolean;
  withBottomNavOffset?: boolean;
};

function formatTrainerPrice(cents: number, currency: string): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function TrainerProfileStickyBar({
  profile,
  isAuthenticated,
  withBottomNavOffset = false,
}: TrainerProfileStickyBarProps) {
  const base = `/book/${profile.id}`;
  const bookHref = isAuthenticated
    ? base
    : `/auth/login?callbackUrl=${encodeURIComponent(base)}`;

  return (
    <div
      className={cn(
        "fixed inset-x-0 z-30 border-t border-border/70 bg-card/95 px-4 py-3 backdrop-blur-md md:hidden",
        withBottomNavOffset
          ? "bottom-[calc(4.5rem+env(safe-area-inset-bottom))]"
          : "bottom-0 pb-[env(safe-area-inset-bottom)]",
      )}
    >
      <div className="mx-auto flex max-w-lg items-center gap-3">
        {profile.fromPriceCents !== null && profile.currency ? (
          <div className="min-w-0">
            <ContentText variant="mutedMicro" as="p">
              {MESSAGES.trainer.profile.fromPriceLabel}
            </ContentText>
            <ContentText variant="smallEmphasis" as="p" className="font-heading">
              {formatTrainerPrice(profile.fromPriceCents, profile.currency)}
            </ContentText>
          </div>
        ) : null}
        <Button asChild size="lg" className="ml-auto min-w-[140px] shrink-0">
          <Link href={bookHref}>{MESSAGES.trainer.profile.bookNow}</Link>
        </Button>
      </div>
    </div>
  );
}
