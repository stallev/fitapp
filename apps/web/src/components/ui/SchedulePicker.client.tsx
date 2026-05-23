"use client";

import { ContentText, Heading } from "@/components/atoms";
import { PulseCard } from "@/components/ui/card";
import { ScheduleDayPickerRow } from "@/components/ui/ScheduleDayPickerRow.client";
import { TimeSlotButton } from "@/components/ui/TimeSlotButton";
import { cn } from "@/lib/utils";

export type ScheduleDay = {
  id: string;
  weekday: string;
  day: string;
};

export type ScheduleSlot = {
  id: string;
  label: string;
  available?: boolean;
};

export type SchedulePickerProps = {
  days: ReadonlyArray<ScheduleDay>;
  slots: ReadonlyArray<ScheduleSlot>;
  activeDayId: string;
  onDayChange: (dayId: string) => void;
  onSlotSelect?: (slotId: string) => void;
  timezoneLabel?: string;
  className?: string;
};

export function SchedulePicker({
  days,
  slots,
  activeDayId,
  onDayChange,
  onSlotSelect,
  timezoneLabel = "UTC+3",
  className,
}: SchedulePickerProps) {
  return (
    <PulseCard variant="base" className={cn("p-4", className)}>
      <div className="mb-3 flex items-center justify-between">
        <Heading as="h3" visualLevel="h3">
          This week
        </Heading>
        <ContentText variant="mutedMicro" as="span" className="font-mono">
          {timezoneLabel}
        </ContentText>
      </div>
      <ScheduleDayPickerRow
        days={days}
        activeDayId={activeDayId}
        onDayChange={onDayChange}
      />
      <div className="mt-4 grid grid-cols-3 gap-2">
        {slots.map((slot) => (
          <TimeSlotButton
            key={slot.id}
            available={slot.available ?? true}
            onClick={() => onSlotSelect?.(slot.id)}
          >
            {slot.label}
          </TimeSlotButton>
        ))}
      </div>
    </PulseCard>
  );
}
