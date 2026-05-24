"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { completeBookingAction } from "@/actions/trainer/complete-booking";
import { Button } from "@/components/ui/button";
import { MESSAGES } from "@/lib/messages";
import { PRODUCT_TOAST_DURATION_MS } from "@/lib/ui/product-toast";

export type CompleteBookingButtonProps = {
  bookingId: string;
};

export function CompleteBookingButton({ bookingId }: CompleteBookingButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleComplete() {
    startTransition(async () => {
      const result = await completeBookingAction({ bookingId });
      if (!result.ok) {
        toast.error(result.message, { duration: PRODUCT_TOAST_DURATION_MS });
        return;
      }

      toast.success(MESSAGES.trainer.clients.completeSuccess, {
        duration: PRODUCT_TOAST_DURATION_MS,
      });
      router.refresh();
    });
  }

  return (
    <Button
      type="button"
      size="sm"
      onClick={handleComplete}
      disabled={isPending}
      aria-busy={isPending}
    >
      {isPending
        ? MESSAGES.trainer.clients.completingSession
        : MESSAGES.trainer.clients.completeSession}
    </Button>
  );
}
