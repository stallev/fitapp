import "server-only";

import { notFound } from "next/navigation";

import { BOOKING_STATUS } from "@pulse/domain";
import { getPrisma } from "@pulse/db";
import { assertCanReadBooking, PolicyError } from "@pulse/policy-server";

import { formatBookingDateTime } from "@/lib/booking/booking-wizard-utils";
import { getPolicySessionContext } from "@/server/auth/session-to-policy-context";

export type ClientReviewFormContext = {
  bookingId: string;
  trainerName: string;
  trainerPhotoUrl: string | null;
  serviceNameSnapshot: string;
  sessionDateLabel: string;
};

export async function getClientReviewFormContext(
  bookingId: string,
): Promise<ClientReviewFormContext | null> {
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
      status: BOOKING_STATUS.COMPLETED,
      review: null,
    },
    select: {
      id: true,
      serviceNameSnapshot: true,
      startsAt: true,
      trainerProfile: {
        select: {
          photoUrl: true,
          timezone: true,
          user: { select: { fullName: true } },
        },
      },
    },
  });

  if (!booking) {
    return null;
  }

  const startsAtUtc = booking.startsAt.toISOString();
  const timezone = booking.trainerProfile.timezone;

  return {
    bookingId: booking.id,
    trainerName: booking.trainerProfile.user.fullName,
    trainerPhotoUrl: booking.trainerProfile.photoUrl,
    serviceNameSnapshot: booking.serviceNameSnapshot,
    sessionDateLabel: formatBookingDateTime(startsAtUtc, timezone),
  };
}

export async function requireClientReviewFormContext(
  bookingId: string,
): Promise<ClientReviewFormContext> {
  const context = await getClientReviewFormContext(bookingId);

  if (!context) {
    notFound();
  }

  return context;
}
