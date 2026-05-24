import { TrainerApplicationsGridSkeleton } from "@/components/admin/TrainerApplicationsGridSkeleton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { MESSAGES } from "@/lib/messages";

export default function AdminTrainersLoading() {
  return (
    <>
      <PageHeader title={MESSAGES.admin.moderation.title} />
      <div className="mt-6">
        <Skeleton className="h-10 w-full max-w-md rounded-full" />
        <TrainerApplicationsGridSkeleton className="mt-4" />
      </div>
    </>
  );
}
