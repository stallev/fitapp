import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CatalogRetryButton } from "@/components/catalog/CatalogRetryButton.client";
import { MESSAGES } from "@/lib/messages";

export function CatalogError() {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon aria-hidden />
      <AlertTitle>{MESSAGES.catalog.error.title}</AlertTitle>
      <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span>{MESSAGES.catalog.error.description}</span>
        <CatalogRetryButton />
      </AlertDescription>
    </Alert>
  );
}
