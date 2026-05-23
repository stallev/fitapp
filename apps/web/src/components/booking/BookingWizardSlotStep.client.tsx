"use client";

import { ContentText, Heading } from "@/components/atoms";
import { SchedulePicker } from "@/components/ui/SchedulePicker.client";
import { Skeleton } from "@/components/ui/skeleton";

import type { SchedulePickerDay, SchedulePickerSlot } from "@/lib/booking/map-slots-to-schedule-picker";
import { MESSAGES } from "@/lib/messages";

export type BookingWizardSlotStepProps = {
  days: SchedulePickerDay[];
  slots: SchedulePickerSlot[];
  activeDayId: string;
  selectedSlotId: string | null;
  timezoneLabel: string;
  isLoading: boolean;
  onDayChange: (dayId: string) => void;
  onSlotSelect: (slotId: string) => void;
};

export function BookingWizardSlotStep({
  days,
  slots,
  activeDayId,
  selectedSlotId,
  timezoneLabel,
  isLoading,
  onDayChange,
  onSlotSelect,
}: BookingWizardSlotStepProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    );
  }

  if (days.length === 0) {
    return (
      <div className="space-y-2 py-6 text-center">
        <Heading as="h2" visualLevel="h3">
          {MESSAGES.booking.wizard.noSlotsTitle}
        </Heading>
        <ContentText variant="muted" as="p">
          {MESSAGES.booking.wizard.noSlotsDescription}
        </ContentText>
      </div>
    );
  }

  return (
    <SchedulePicker
      days={days}
      slots={slots}
      activeDayId={activeDayId}
      selectedSlotId={selectedSlotId ?? undefined}
      timezoneLabel={timezoneLabel}
      title={MESSAGES.booking.wizard.scheduleTitle}
      emptySlotsTitle={MESSAGES.booking.wizard.noSlotsTitle}
      emptySlotsDescription={MESSAGES.booking.wizard.noSlotsDescription}
      swipeDaysHint={MESSAGES.booking.wizard.swipeDaysHint}
      onDayChange={onDayChange}
      onSlotSelect={onSlotSelect}
    />
  );
}
