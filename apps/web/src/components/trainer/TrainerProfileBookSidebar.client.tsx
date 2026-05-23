"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ContentText } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { PulseCard } from "@/components/ui/card";
import type { PublicTrainerProfile } from "@/lib/trainer/trainer-profile";
import { MESSAGES } from "@/lib/messages";

export type TrainerProfileBookSidebarProps = {
  profile: PublicTrainerProfile;
  isAuthenticated: boolean;
};

function formatTrainerPrice(cents: number, currency: string): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function TrainerProfileBookSidebar({
  profile,
  isAuthenticated,
}: TrainerProfileBookSidebarProps) {
  const [selectedServiceId, setSelectedServiceId] = useState(
    profile.defaultServiceId ?? profile.services[0]?.id ?? "",
  );

  const selectedService = useMemo(
    () => profile.services.find((service) => service.id === selectedServiceId) ?? null,
    [profile.services, selectedServiceId],
  );

  const bookHref = useMemo(() => {
    const base = `/book/${profile.id}`;
    const query = selectedServiceId ? `?serviceId=${selectedServiceId}` : "";
    const target = `${base}${query}`;

    if (isAuthenticated) {
      return target;
    }

    return `/auth/login?callbackUrl=${encodeURIComponent(target)}`;
  }, [isAuthenticated, profile.id, selectedServiceId]);

  const priceCents = selectedService?.priceCents ?? profile.fromPriceCents;
  const currency = selectedService?.currency ?? profile.currency;

  return (
    <PulseCard className="sticky top-24 hidden p-5 md:block">
      <ContentText variant="mutedMicro" as="p">
        {MESSAGES.trainer.profile.fromPriceLabel}
      </ContentText>
      {priceCents !== null && currency ? (
        <ContentText variant="smallEmphasis" as="p" className="mt-1 font-heading text-[36px]">
          {formatTrainerPrice(priceCents, currency)}
        </ContentText>
      ) : null}
      <ContentText variant="mutedMicro" as="p" className="mt-1">
        {MESSAGES.trainer.profile.perSessionLabel}
      </ContentText>

      {profile.services.length > 1 ? (
        <label className="mt-4 block space-y-2">
          <ContentText variant="mutedMicro" as="span">
            {MESSAGES.trainer.profile.serviceSelectLabel}
          </ContentText>
          <select
            value={selectedServiceId}
            onChange={(event) => setSelectedServiceId(event.target.value)}
            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
          >
            {profile.services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <Button asChild size="lg" className="mt-4 w-full">
        <Link href={bookHref}>{MESSAGES.trainer.profile.bookNow}</Link>
      </Button>
    </PulseCard>
  );
}
