"use client";

import type { Locale } from "date-fns";

import { Calendar } from "@/components/ui/calendar";

export type DatePickerCalendarPanelProps = {
  selectedDate: Date | undefined;
  defaultMonth: Date;
  dateLocale: Locale;
  startMonth: Date;
  endMonth: Date;
  disabledDate: (date: Date) => boolean;
  onSelect: (date: Date) => void;
};

export function DatePickerCalendarPanel({
  selectedDate,
  defaultMonth,
  dateLocale,
  startMonth,
  endMonth,
  disabledDate,
  onSelect,
}: DatePickerCalendarPanelProps) {
  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      defaultMonth={defaultMonth}
      captionLayout="dropdown"
      captionDropdown="grid"
      locale={dateLocale}
      weekStartsOn={1}
      startMonth={startMonth}
      endMonth={endMonth}
      disabled={disabledDate}
      onSelect={(date) => {
        if (date) onSelect(date);
      }}
    />
  );
}
