import { PageHeader } from "@/components/ui/PageHeader";
import { CatalogTrainerGridSkeleton } from "@/components/catalog/CatalogTrainerGridSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { MESSAGES } from "@/lib/messages";

export default function TrainersLoading() {
  return (
    <div className="space-y-4">
      <PageHeader title={MESSAGES.catalog.title} />
      <Skeleton className="h-11 w-full rounded-full" />
      <CatalogTrainerGridSkeleton />
    </div>
  );
}
