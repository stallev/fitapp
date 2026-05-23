import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import {
  BOOKING_STATUS,
  formatTrainerTimezoneLabel,
  generateAvailableSlots,
  getLocalDateRangeFromToday,
  TRAINER_STATUS,
  type SlotDto,
} from "@pulse/domain";
import { getPrisma } from "@pulse/db";

import { CACHE_TAGS } from "@/lib/cache/tags";
import { formatPrismaDate, formatPrismaTime } from "@/lib/trainer/schedule-time";

const PREVIEW_DAY_COUNT = 7;

export type TrainerSchedulePreview = {
  timezone: string;
  timezoneLabel: string;
  slots: SlotDto[];
  slotDurationMinutes: number;
};

export async function getTrainerSchedulePreview(
  trainerProfileId: string,
  slotDurationMinutes: number,
): Promise<TrainerSchedulePreview | null> {
  "use cache";
  cacheTag(CACHE_TAGS.trainer(trainerProfileId));
  cacheLife("minutes");

  const prisma = getPrisma();
  const profile = await prisma.trainerProfile.findFirst({
    where: {
      id: trainerProfileId,
      status: TRAINER_STATUS.APPROVED,
    },
    select: {
      timezone: true,
      weeklyIntervals: {
        select: {
          dayOfWeek: true,
          startTime: true,
          endTime: true,
        },
      },
      scheduleExceptions: {
        select: {
          exceptionDate: true,
          isBlocked: true,
        },
      },
    },
  });

  if (!profile) {
    return null;
  }

  const range = getLocalDateRangeFromToday(profile.timezone, PREVIEW_DAY_COUNT);
  const rangeStart = new Date(`${range.fromLocalDate}T00:00:00.000Z`);
  const rangeEnd = new Date(`${range.toLocalDate}T23:59:59.999Z`);

  const bookings = await prisma.booking.findMany({
    where: {
      trainerProfileId,
      status: { not: BOOKING_STATUS.CANCELLED },
      startsAt: { gte: rangeStart, lte: rangeEnd },
    },
    select: {
      startsAt: true,
      durationMinutes: true,
    },
  });

  const slots = generateAvailableSlots({
    timezone: profile.timezone,
    intervals: profile.weeklyIntervals.map((item) => ({
      dayOfWeek: item.dayOfWeek,
      startTime: formatPrismaTime(item.startTime),
      endTime: formatPrismaTime(item.endTime),
    })),
    exceptions: profile.scheduleExceptions.map((item) => ({
      exceptionDate: formatPrismaDate(item.exceptionDate),
      isBlocked: item.isBlocked,
    })),
    bookings: bookings.map((item) => ({
      startsAtUtc: item.startsAt.toISOString(),
      durationMinutes: item.durationMinutes,
    })),
    range,
    slotDurationMinutes,
  });

  return {
    timezone: profile.timezone,
    timezoneLabel: formatTrainerTimezoneLabel(profile.timezone),
    slots,
    slotDurationMinutes,
  };
}
