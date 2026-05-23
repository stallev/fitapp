import { ChevronRightIcon } from "lucide-react";

import { ContentText } from "@/components/atoms";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CustomLink } from "@/components/ui/CustomLink";
import { PulseCard } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";

import type { ClientBookingListEntry } from "@/data/client/get-client-bookings.server";
import { formatBookingDateTimeLocal } from "@/lib/booking/format-booking-datetime-local";
import {
  getBookingStatusBadgeVariant,
  getBookingStatusLabel,
} from "@/lib/booking/booking-status-ui";
import type { ClientBookingTab } from "@/lib/booking/booking-tab-utils";
import { MESSAGES } from "@/lib/messages";
import { cn } from "@/lib/utils";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "?";
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export type BookingListItemProps = {
  booking: ClientBookingListEntry;
  tab: ClientBookingTab;
  onCancelClick?: () => void;
  onJoinClick?: () => void;
  className?: string;
};

export function BookingListItem({
  booking,
  tab,
  onCancelClick,
  onJoinClick,
  className,
}: BookingListItemProps) {
  const status = booking.status;

  return (
    <PulseCard className={cn("p-4", className)}>
      <CustomLink
        href={`/client/bookings/${booking.id}`}
        className="flex items-start gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Avatar size="md">
          {booking.trainerPhotoUrl ? (
            <AvatarImage
              src={booking.trainerPhotoUrl}
              alt={booking.trainerName}
            />
          ) : null}
          <AvatarFallback>{getInitials(booking.trainerName)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <ContentText as="p" className="truncate text-[15px] font-medium">
              {booking.trainerName}
            </ContentText>
            <StatusBadge status={getBookingStatusBadgeVariant(status)}>
              {getBookingStatusLabel(status)}
            </StatusBadge>
          </div>
          <ContentText variant="mutedMicro" as="p" className="mt-0.5">
            {booking.serviceNameSnapshot}
          </ContentText>
          <ContentText
            variant="mutedMicro"
            as="p"
            className="mt-1.5 font-medium text-primary"
          >
            {formatBookingDateTimeLocal(booking.startsAtUtc)}
          </ContentText>
        </div>
        <ChevronRightIcon
          className="mt-1 size-4 shrink-0 text-muted-foreground"
          aria-hidden
        />
      </CustomLink>

      {tab === "upcoming" && booking.canCancel ? (
        <div className="mt-3 flex gap-2">
          <Button
            type="button"
            size="sm"
            variant="default"
            className="min-h-11 flex-1"
            onClick={onJoinClick}
          >
            {MESSAGES.booking.actions.join}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="min-h-11"
            onClick={onCancelClick}
          >
            {MESSAGES.booking.cancel.button}
          </Button>
        </div>
      ) : null}

      {tab === "past" && !booking.hasReview ? (
        <div className="mt-3">
          <Button asChild size="sm" variant="secondary" className="min-h-11 w-full">
            <CustomLink href={`/client/reviews/${booking.id}`}>
              {MESSAGES.booking.actions.leaveReview}
            </CustomLink>
          </Button>
        </div>
      ) : null}
    </PulseCard>
  );
}
