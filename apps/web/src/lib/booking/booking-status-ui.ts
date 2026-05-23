import {
  BOOKING_STATUS,
  type BookingStatus,
} from "@pulse/domain";

import type { StatusBadgeVariant } from "@/lib/ui/status-badge";
import { MESSAGES } from "@/lib/messages";

const BOOKING_STATUS_BADGE_VARIANT: Record<BookingStatus, StatusBadgeVariant> = {
  pending: "pending",
  confirmed: "confirmed",
  completed: "completed",
  cancelled: "cancelled",
};

const BOOKING_STATUS_LABEL: Record<BookingStatus, string> = {
  pending: MESSAGES.booking.status.pending,
  confirmed: MESSAGES.booking.status.confirmed,
  completed: MESSAGES.booking.status.completed,
  cancelled: MESSAGES.booking.status.cancelled,
};

export function getBookingStatusBadgeVariant(
  status: BookingStatus,
): StatusBadgeVariant {
  return BOOKING_STATUS_BADGE_VARIANT[status];
}

export function getBookingStatusLabel(status: BookingStatus): string {
  return BOOKING_STATUS_LABEL[status];
}

export function isUpcomingBookingStatus(status: BookingStatus): boolean {
  return (
    status === BOOKING_STATUS.PENDING || status === BOOKING_STATUS.CONFIRMED
  );
}

export function isPastBookingStatus(status: BookingStatus): boolean {
  return status === BOOKING_STATUS.COMPLETED;
}

export function isCancelledBookingStatus(status: BookingStatus): boolean {
  return status === BOOKING_STATUS.CANCELLED;
}
