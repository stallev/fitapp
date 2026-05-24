"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import type { MutationResult } from "@pulse/domain";

import { approveTrainerAction } from "@/actions/admin/approve-trainer";
import { Button } from "@/components/ui/button";
import { MESSAGES } from "@/lib/messages";
import { isIosSafari } from "@/lib/ui/is-ios-safari";
import { PRODUCT_TOAST_DURATION_MS } from "@/lib/ui/product-toast";
import { resilientPostFetch } from "@/lib/ui/resilient-post-fetch";

export type ApproveTrainerButtonProps = {
  trainerProfileId: string;
};

export function ApproveTrainerButton({
  trainerProfileId,
}: ApproveTrainerButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleApprove() {
    startTransition(async () => {
      const payload = { trainerProfileId };

      const result: MutationResult<{ trainerProfileId: string }> = isIosSafari()
        ? await resilientPostFetch("/api/admin/trainers/approve", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }).then((response) => response.json())
        : await approveTrainerAction(payload);

      if (!result.ok) {
        toast.error(result.message, { duration: PRODUCT_TOAST_DURATION_MS });
        router.refresh();
        return;
      }

      toast.success(MESSAGES.admin.moderation.approveSuccess, {
        duration: PRODUCT_TOAST_DURATION_MS,
      });
      router.refresh();
    });
  }

  return (
    <Button
      type="button"
      onClick={handleApprove}
      disabled={isPending}
      aria-busy={isPending}
    >
      {isPending
        ? MESSAGES.admin.moderation.approving
        : MESSAGES.admin.moderation.approve}
    </Button>
  );
}
