import { AdminQueueGridSkeleton } from "@/components/admin/AdminQueueGridSkeleton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { MESSAGES } from "@/lib/messages";

export default function AdminComplaintsLoading() {
  return (
    <>
      <PageHeader title={MESSAGES.admin.complaints.title} />
      <div className="mt-6">
        <Skeleton className="h-10 w-full max-w-md rounded-full" />
        <AdminQueueGridSkeleton count={4} className="mt-4" />
      </div>
    </>
  );
}
