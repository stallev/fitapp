"use client";

import { AdminPageError } from "@/components/admin/AdminPageError";
import { MESSAGES } from "@/lib/messages";

export default function AdminRefundsError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <AdminPageError
      pageTitle={MESSAGES.admin.refunds.title}
      title={MESSAGES.admin.shared.loadError}
      description={MESSAGES.admin.shared.loadErrorDescription}
      retryLabel={MESSAGES.admin.shared.retry}
      reset={reset}
    />
  );
}
