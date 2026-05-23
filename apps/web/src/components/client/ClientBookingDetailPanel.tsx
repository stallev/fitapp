import type { ReactNode } from "react";

import { ContentText, Heading } from "@/components/atoms";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PulseCard } from "@/components/ui/card";
import { KeyValueRow } from "@/components/ui/KeyValueRow";
import { Button } from "@/components/ui/button";
import { CustomLink } from "@/components/ui/CustomLink";

import {
  formatBookingDateTime,
  formatBookingPrice,
} from "@/lib/booking/booking-wizard-utils";
import {
  getBookingStatusBadgeVariant,
  getBookingStatusLabel,
} from "@/lib/booking/booking-status-ui";
import type { ClientBookingDetail } from "@/data/client/get-client-booking-detail.server";
import { isPendingBookingStatus } from "@/data/client/get-client-booking-detail.server";
import { isBookingStatus } from "@pulse/domain";
import { MESSAGES } from "@/lib/messages";

export type ClientBookingDetailPanelProps = {
  booking: ClientBookingDetail;
  actions?: ReactNode;
};

export function ClientBookingDetailPanel({
  booking,
  actions,
}: ClientBookingDetailPanelProps) {
  const statusLabel = isBookingStatus(booking.status)
    ? getBookingStatusLabel(booking.status)
    : booking.status;
  const statusVariant = isBookingStatus(booking.status)
    ? getBookingStatusBadgeVariant(booking.status)
    : "neutral";

  return (
    <div className="space-y-6 py-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Heading as="h1" visualLevel="h2">
            {MESSAGES.booking.detail.title}
          </Heading>
          {isPendingBookingStatus(booking.status) ? (
            <ContentText variant="mutedMicro" as="p" className="mt-1">
              {MESSAGES.booking.detail.statusPending}
            </ContentText>
          ) : null}
        </div>
        <StatusBadge status={statusVariant}>{statusLabel}</StatusBadge>
      </div>

      <PulseCard className="space-y-3 p-5">
        <KeyValueRow
          label={MESSAGES.booking.detail.trainerLabel}
          value={booking.trainerName}
        />
        <KeyValueRow
          label={MESSAGES.booking.detail.serviceLabel}
          value={booking.serviceNameSnapshot}
        />
        <KeyValueRow
          label={MESSAGES.booking.detail.timeLabel}
          value={formatBookingDateTime(
            booking.startsAtUtc,
            booking.trainerTimezone,
          )}
        />
        <ContentText variant="mutedMicro" as="p">
          {MESSAGES.booking.detail.timezoneHint}
        </ContentText>
        <KeyValueRow
          label={MESSAGES.booking.detail.priceLabel}
          value={formatBookingPrice(booking.priceCents, booking.currency)}
        />
        {booking.clientMessage ? (
          <KeyValueRow
            label={MESSAGES.booking.detail.messageLabel}
            value={booking.clientMessage}
          />
        ) : null}
      </PulseCard>

      {actions}

      <Button asChild variant="outline">
        <CustomLink href="/client/bookings">
          {MESSAGES.booking.detail.backToBookings}
        </CustomLink>
      </Button>
    </div>
  );
}
