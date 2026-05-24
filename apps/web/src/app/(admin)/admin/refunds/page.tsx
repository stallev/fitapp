import { Suspense } from "react";

import { AdminQueueGridSkeleton } from "@/components/admin/AdminQueueGridSkeleton";
import { RefundsPageContent } from "@/components/admin/RefundsPageContent.server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { MESSAGES } from "@/lib/messages";

export default function AdminRefundsPage() {
  return (
    <>
      <PageHeader title={MESSAGES.admin.refunds.title} />
      <Suspense
        fallback={
          <div className="mt-6 space-y-6">
            <Skeleton className="h-4 w-full max-w-lg" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-24 rounded-2xl" />
              <Skeleton className="h-24 rounded-2xl" />
            </div>
            <AdminQueueGridSkeleton count={2} />
          </div>
        }
      >
        <RefundsPageContent />
      </Suspense>
    </>
  );
}
