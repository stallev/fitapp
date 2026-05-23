"use client";

import Link from "next/link";
import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { MESSAGES } from "@/lib/messages";

export default function TrainerProfileError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertCircleIcon aria-hidden />
        <AlertTitle>{MESSAGES.trainer.profile.error.title}</AlertTitle>
        <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span>{MESSAGES.trainer.profile.error.description}</span>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={reset}>
              {MESSAGES.trainer.profile.error.retry}
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link href="/trainers">
                {MESSAGES.trainer.profile.error.backToCatalog}
              </Link>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
