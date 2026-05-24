import "server-only";

import { notFound } from "next/navigation";

import {
  BOOKING_STATUS,
  COMPLAINT_STATUS,
  REFUND_STATUS,
  canClientCancelBooking,
} from "@pulse/domain";
import { getPrisma } from "@pulse/db";
import { assertCanReadBooking, PolicyError } from "@pulse/policy-server";

import { getPolicySessionContext } from "@/server/auth/session-to-policy-context";

export type ClientBookingDetail = {
  id: string;
  status: string;
  serviceNameSnapshot: string;
  startsAtUtc: string;
  durationMinutes: number;
  priceCents: number;
  currency: string;
  clientMessage: string | null;
  trainerName: string;
  trainerPhotoUrl: string | null;
  trainerTimezone: string;
  canCancel: boolean;
  canLeaveReview: boolean;
  canFileComplaint: boolean;
  canRequestRefund: boolean;
};

export async function getClientBookingDetail(
  bookingId: string,
): Promise<ClientBookingDetail | null> {
  const ctx = await getPolicySessionContext();
  if (!ctx) {
    return null;
  }

  try {
    await assertCanReadBooking(ctx, bookingId);
  } catch (error) {
    if (error instanceof PolicyError) {
      return null;
    }

    throw error;
  }

  const prisma = getPrisma();
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      clientId: ctx.userId,
    },
    select: {
      id: true,
      status: true,
      serviceNameSnapshot: true,
      startsAt: true,
      durationMinutes: true,
      priceCents: true,
      currency: true,
      clientMessage: true,
      review: { select: { id: true } },
      complaints: {
        where: {
          status: { in: [COMPLAINT_STATUS.OPEN, COMPLAINT_STATUS.IN_REVIEW] },
        },
        select: { id: true },
        take: 1,
      },
      refundRequests: {
        where: { status: REFUND_STATUS.PENDING },
        select: { id: true },
        take: 1,
      },
      trainerProfile: {
        select: {
          timezone: true,
          photoUrl: true,
          user: { select: { fullName: true } },
        },
      },
    },
  });

  if (!booking) {
    return null;
  }

  const startsAtUtc = booking.startsAt.toISOString();

  const isEligibleForSupport =
    booking.status === BOOKING_STATUS.COMPLETED ||
    booking.status === BOOKING_STATUS.CANCELLED ||
    booking.status === BOOKING_STATUS.CONFIRMED;

  const isEligibleForRefund =
    booking.status === BOOKING_STATUS.COMPLETED ||
    booking.status === BOOKING_STATUS.CANCELLED;

  return {
    id: booking.id,
    status: booking.status,
    serviceNameSnapshot: booking.serviceNameSnapshot,
    startsAtUtc,
    durationMinutes: booking.durationMinutes,
    priceCents: booking.priceCents,
    currency: booking.currency,
    clientMessage: booking.clientMessage,
    trainerName: booking.trainerProfile.user.fullName,
    trainerPhotoUrl: booking.trainerProfile.photoUrl,
    trainerTimezone: booking.trainerProfile.timezone,
    canCancel: canClientCancelBooking({
      status: booking.status,
      startsAtUtc,
    }),
    canLeaveReview:
      booking.status === BOOKING_STATUS.COMPLETED && booking.review === null,
    canFileComplaint:
      isEligibleForSupport && booking.complaints.length === 0,
    canRequestRefund:
      isEligibleForRefund && booking.refundRequests.length === 0,
  };
}

export async function requireClientBookingDetail(
  bookingId: string,
): Promise<ClientBookingDetail> {
  const booking = await getClientBookingDetail(bookingId);

  if (!booking) {
    notFound();
  }

  return booking;
}

export function isPendingBookingStatus(status: string): boolean {
  return status === BOOKING_STATUS.PENDING;
}
