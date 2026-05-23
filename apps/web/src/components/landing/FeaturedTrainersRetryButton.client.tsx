"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { MESSAGES } from "@/lib/messages";

export function FeaturedTrainersRetryButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={isPending}
      aria-busy={isPending}
      onClick={() => {
        startTransition(() => {
          router.refresh();
        });
      }}
    >
      {isPending
        ? MESSAGES.landing.featured.error.retrying
        : MESSAGES.landing.featured.error.retry}
    </Button>
  );
}
