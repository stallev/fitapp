"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import type { MutationResult } from "@pulse/domain";

import { rejectTrainerAction } from "@/actions/admin/reject-trainer";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MESSAGES } from "@/lib/messages";
import { isIosSafari } from "@/lib/ui/is-ios-safari";
import { PRODUCT_TOAST_DURATION_MS } from "@/lib/ui/product-toast";
import { resilientPostFetch } from "@/lib/ui/resilient-post-fetch";

export type RejectTrainerDialogProps = {
  trainerProfileId: string;
};

export function RejectTrainerDialog({ trainerProfileId }: RejectTrainerDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleReject() {
    if (reason.trim().length < 10) {
      setFieldError(MESSAGES.admin.moderation.rejectionReasonRequired);
      return;
    }

    setFieldError(null);

    startTransition(async () => {
      const payload = { trainerProfileId, rejectionReason: reason.trim() };

      const result: MutationResult<{ trainerProfileId: string }> = isIosSafari()
        ? await resilientPostFetch("/api/admin/trainers/reject", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }).then((response) => response.json())
        : await rejectTrainerAction(payload);

      if (!result.ok) {
        toast.error(result.message, { duration: PRODUCT_TOAST_DURATION_MS });
        router.refresh();
        return;
      }

      toast.success(MESSAGES.admin.moderation.rejectSuccess, {
        duration: PRODUCT_TOAST_DURATION_MS,
      });
      setOpen(false);
      setReason("");
      router.refresh();
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="outline">
          {MESSAGES.admin.moderation.reject}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{MESSAGES.admin.moderation.reject}</AlertDialogTitle>
          <AlertDialogDescription>
            {MESSAGES.admin.moderation.rejectionReasonPlaceholder}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-2">
          <Label htmlFor="rejection-reason">
            {MESSAGES.admin.moderation.rejectionReasonLabel}
          </Label>
          <Textarea
            id="rejection-reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            className="max-w-[650px]"
            rows={4}
            aria-invalid={fieldError ? true : undefined}
          />
          {fieldError ? (
            <p className="text-sm text-destructive">{fieldError}</p>
          ) : null}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {MESSAGES.shell.back}
          </AlertDialogCancel>
          <Button
            type="button"
            variant="destructive"
            onClick={handleReject}
            disabled={isPending}
            aria-busy={isPending}
          >
            {isPending
              ? MESSAGES.admin.moderation.rejecting
              : MESSAGES.admin.moderation.reject}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
