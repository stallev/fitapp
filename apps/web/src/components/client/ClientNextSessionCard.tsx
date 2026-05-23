import { CalendarIcon, SearchIcon } from "lucide-react";

import { ContentText } from "@/components/atoms";
import { CustomLink } from "@/components/ui/CustomLink";
import { PulseCard } from "@/components/ui/card";

import type { ClientBookingListEntry } from "@/data/client/get-client-bookings.server";
import { formatBookingDateTimeLocal } from "@/lib/booking/format-booking-datetime-local";
import { MESSAGES } from "@/lib/messages";

export type ClientNextSessionCardProps = {
  session: ClientBookingListEntry | null;
};

export function ClientNextSessionCard({ session }: ClientNextSessionCardProps) {
  if (!session) {
    return (
      <PulseCard className="space-y-3 p-5">
        <ContentText variant="mutedMicro" as="p">
          {MESSAGES.dashboard.client.nextSessionTitle}
        </ContentText>
        <ContentText as="p">{MESSAGES.dashboard.client.nextSessionEmpty}</ContentText>
        <CustomLink as="button" href="/trainers" className="min-h-11 w-full">
          {MESSAGES.dashboard.client.nextSessionCta}
        </CustomLink>
      </PulseCard>
    );
  }

  return (
    <PulseCard className="space-y-3 p-5">
      <ContentText variant="mutedMicro" as="p">
        {MESSAGES.dashboard.client.nextSessionTitle}
      </ContentText>
      <div className="flex items-start gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
          <CalendarIcon className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <ContentText as="p" className="font-medium">
            {session.trainerName}
          </ContentText>
          <ContentText variant="mutedMicro" as="p" className="mt-0.5">
            {session.serviceNameSnapshot}
          </ContentText>
          <ContentText
            variant="mutedMicro"
            as="p"
            className="mt-1 font-medium text-primary"
            suppressHydrationWarning
          >
            {formatBookingDateTimeLocal(session.startsAtUtc)}
          </ContentText>
        </div>
      </div>
      <CustomLink
        as="button"
        variant="outline"
        href={`/client/bookings/${session.id}`}
        className="min-h-11 w-full"
      >
        {MESSAGES.booking.detail.title}
      </CustomLink>
    </PulseCard>
  );
}

export function ClientDashboardSearchEntry() {
  return (
    <CustomLink
      as="button"
      variant="outline"
      href="/trainers"
      aria-label={MESSAGES.dashboard.client.searchAriaLabel}
      className="h-12 w-full justify-start gap-3 rounded-full px-4 text-left md:h-14 md:px-5"
    >
      <SearchIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      <span className="truncate text-muted-foreground">
        {MESSAGES.dashboard.client.searchPlaceholder}
      </span>
    </CustomLink>
  );
}
