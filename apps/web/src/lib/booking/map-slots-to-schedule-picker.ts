import { listLocalDatesFromToday, type SlotDto } from "@pulse/domain";

import { BOOKING_WIZARD_SLOT_DAY_COUNT } from "@/lib/booking/booking-wizard-utils";
import { groupScheduleSlotsByDay } from "@/lib/trainer/group-schedule-slots";

export type SchedulePickerDay = {
  id: string;
  weekday: string;
  day: string;
};

export type SchedulePickerSlot = {
  id: string;
  label: string;
  available: boolean;
};

function formatWeekdayLabel(localDate: string, timezone: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: timezone,
    weekday: "short",
  })
    .format(new Date(`${localDate}T12:00:00Z`))
    .replace(".", "");
}

function formatDayNumber(localDate: string, timezone: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: timezone,
    day: "numeric",
  }).format(new Date(`${localDate}T12:00:00Z`));
}

export function mapSlotsToSchedulePicker(
  timezone: string,
  slots: SlotDto[],
  dayCount = BOOKING_WIZARD_SLOT_DAY_COUNT,
  now = new Date(),
): {
  days: SchedulePickerDay[];
  slotsByDay: Map<string, SchedulePickerSlot[]>;
} {
  const dayGroups = groupScheduleSlotsByDay(timezone, slots);
  const slotsByLocalDate = new Map(
    dayGroups.map((group) => [group.localDate, group.slots]),
  );

  const localDates = listLocalDatesFromToday(timezone, dayCount, now);
  const days: SchedulePickerDay[] = localDates.map((localDate) => ({
    id: localDate,
    weekday: formatWeekdayLabel(localDate, timezone),
    day: formatDayNumber(localDate, timezone),
  }));

  const slotsByDay = new Map<string, SchedulePickerSlot[]>();

  for (const localDate of localDates) {
    const daySlots = slotsByLocalDate.get(localDate) ?? [];
    slotsByDay.set(
      localDate,
      daySlots.map((slot) => ({
        id: slot.startsAtUtc,
        label: slot.localLabel,
        available: true,
      })),
    );
  }

  return { days, slotsByDay };
}

export function getSlotsForDay(
  slotsByDay: Map<string, SchedulePickerSlot[]>,
  activeDayId: string,
): SchedulePickerSlot[] {
  return slotsByDay.get(activeDayId) ?? [];
}
