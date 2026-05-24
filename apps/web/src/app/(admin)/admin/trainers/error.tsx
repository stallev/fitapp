"use client";

import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/PageHeader";
import { MESSAGES } from "@/lib/messages";

export default function AdminTrainersError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <>
      <PageHeader title={MESSAGES.admin.moderation.title} />
      <Alert variant="destructive" className="mt-6">
        <AlertCircleIcon aria-hidden />
        <AlertTitle>{MESSAGES.admin.moderation.loadError}</AlertTitle>
        <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span>{MESSAGES.admin.moderation.loadErrorDescription}</span>
          <Button type="button" variant="outline" size="sm" onClick={reset}>
            {MESSAGES.admin.moderation.retry}
          </Button>
        </AlertDescription>
      </Alert>
    </>
  );
}
