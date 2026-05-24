"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { TrainerServiceForEdit } from "@/data/trainer/get-trainer-services-for-edit.server";
import { MESSAGES } from "@/lib/messages";

export type TrainerServiceDeleteDialogProps = {
  service: TrainerServiceForEdit | null;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function TrainerServiceDeleteDialog({
  service,
  isPending,
  onOpenChange,
  onConfirm,
}: TrainerServiceDeleteDialogProps) {
  return (
    <AlertDialog open={service !== null} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{MESSAGES.trainer.services.deleteConfirmTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {MESSAGES.trainer.services.deleteConfirmDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {MESSAGES.trainer.services.cancel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              onConfirm();
            }}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {MESSAGES.trainer.services.deleteConfirmAction}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
