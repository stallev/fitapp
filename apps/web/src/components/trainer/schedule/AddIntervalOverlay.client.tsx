"use client";

import { useId } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { MESSAGES } from "@/lib/messages";
import { SCHEDULE_WEEKDAYS } from "@/lib/trainer/schedule-weekdays";

import { AddIntervalForm } from "./AddIntervalForm.client";

export type AddIntervalOverlayProps = {
  open: boolean;
  dayOfWeek: number | null;
  resetKey?: number;
  onOpenChange: (open: boolean) => void;
  onAdd: (startTime: string, endTime: string) => void;
  disabled?: boolean;
};

function getDayLabel(dayOfWeek: number | null): string | null {
  if (dayOfWeek === null) {
    return null;
  }

  return (
    SCHEDULE_WEEKDAYS.find((day) => day.dayOfWeek === dayOfWeek)?.label ?? null
  );
}

export function AddIntervalOverlay({
  open,
  dayOfWeek,
  resetKey = 0,
  onOpenChange,
  onAdd,
  disabled = false,
}: AddIntervalOverlayProps) {
  const isMobile = useIsMobile();
  const formId = useId();
  const dayLabel = getDayLabel(dayOfWeek);
  const formInstanceKey = `${dayOfWeek ?? "none"}-${resetKey}`;

  function handleAdd(startTime: string, endTime: string) {
    onAdd(startTime, endTime);
    onOpenChange(false);
  }

  const desktopDescription = dayLabel
    ? MESSAGES.trainer.schedule.addIntervalDescriptionForDay.replace(
        "{day}",
        dayLabel,
      )
    : MESSAGES.trainer.schedule.addIntervalDescription;

  if (isMobile) {
    const mobileTitle = dayLabel
      ? MESSAGES.trainer.schedule.addIntervalTitleWithDay.replace(
          "{day}",
          dayLabel,
        )
      : MESSAGES.trainer.schedule.addIntervalTitle;

    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="flex flex-col px-5 pt-0">
          <SheetHeader className="px-0 text-left">
            <SheetTitle>{mobileTitle}</SheetTitle>
          </SheetHeader>
          <AddIntervalForm
            key={formInstanceKey}
            formId={formId}
            mobileSheet
            disabled={disabled}
            onSubmit={handleAdd}
            onCancel={() => onOpenChange(false)}
          />
          <SheetFooter className="flex-row gap-2 px-0 pb-0">
            <Button
              type="button"
              variant="outline"
              className="min-h-11 flex-1"
              onClick={() => onOpenChange(false)}
              disabled={disabled}
            >
              {MESSAGES.trainer.schedule.cancel}
            </Button>
            <Button
              type="submit"
              form={formId}
              className="min-h-11 flex-1"
              disabled={disabled}
              aria-busy={disabled}
            >
              {MESSAGES.trainer.schedule.addSlot}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-4">
        <DialogHeader>
          <DialogTitle>{MESSAGES.trainer.schedule.addIntervalTitle}</DialogTitle>
          <DialogDescription>{desktopDescription}</DialogDescription>
        </DialogHeader>
        <AddIntervalForm
          key={formInstanceKey}
          formId={formId}
          disabled={disabled}
          onSubmit={handleAdd}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
