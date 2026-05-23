"use client";

import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/PageHeader";
import { MESSAGES } from "@/lib/messages";

export default function TrainersError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="space-y-4">
      <PageHeader title={MESSAGES.catalog.title} />
      <Alert variant="destructive">
        <AlertCircleIcon aria-hidden />
        <AlertTitle>{MESSAGES.catalog.error.title}</AlertTitle>
        <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span>{MESSAGES.catalog.error.description}</span>
          <Button type="button" variant="outline" size="sm" onClick={reset}>
            {MESSAGES.catalog.error.retry}
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
