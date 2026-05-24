"use client";

import { AdminPageError } from "@/components/admin/AdminPageError";
import { MESSAGES } from "@/lib/messages";

export default function AdminDashboardError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <AdminPageError
      pageTitle={MESSAGES.dashboard.adminTitle}
      title={MESSAGES.admin.shared.loadError}
      description={MESSAGES.admin.shared.loadErrorDescription}
      retryLabel={MESSAGES.admin.shared.retry}
      reset={reset}
    />
  );
}
