"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { MESSAGES } from "@/lib/messages";
import { PRODUCT_TOAST_DURATION_MS } from "@/lib/ui/product-toast";

export function TrainerDashboardSubmittedToast() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("submitted") !== "1") {
      return;
    }

    toast.success(MESSAGES.trainer.onboarding.submitSuccess, {
      duration: PRODUCT_TOAST_DURATION_MS,
    });

    router.replace("/trainer/dashboard");
  }, [router, searchParams]);

  return null;
}
