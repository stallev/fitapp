import "server-only";

import { notFound } from "next/navigation";

import { BOOKING_STATUS } from "@pulse/domain";
import { getPrisma } from "@pulse/db";

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
};

export async function getClientBookingDetail(
  bookingId: string,
): Promise<ClientBookingDetail | null> {
  const ctx = await getPolicySessionContext();
  if (!ctx) {
    return null;
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

  return {
    id: booking.id,
    status: booking.status,
    serviceNameSnapshot: booking.serviceNameSnapshot,
    startsAtUtc: booking.startsAt.toISOString(),
    durationMinutes: booking.durationMinutes,
    priceCents: booking.priceCents,
    currency: booking.currency,
    clientMessage: booking.clientMessage,
    trainerName: booking.trainerProfile.user.fullName,
    trainerPhotoUrl: booking.trainerProfile.photoUrl,
    trainerTimezone: booking.trainerProfile.timezone,
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
