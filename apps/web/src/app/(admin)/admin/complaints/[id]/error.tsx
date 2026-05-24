"use client";

import { AdminPageError } from "@/components/admin/AdminPageError";
import { MESSAGES } from "@/lib/messages";

export default function AdminComplaintDetailError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <AdminPageError
      pageTitle={MESSAGES.admin.complaints.detail}
      title={MESSAGES.admin.shared.loadError}
      description={MESSAGES.admin.shared.loadErrorDescription}
      retryLabel={MESSAGES.admin.shared.retry}
      reset={reset}
    />
  );
}
