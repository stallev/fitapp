import { PulseCard } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function CatalogTrainerCardSkeleton() {
  return (
    <PulseCard variant="row" className="min-w-0">
      <Skeleton className="size-24 shrink-0 rounded-2xl" />
      <div className="min-w-0 flex-1 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </PulseCard>
  );
}

export function CatalogTrainerGridSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading trainers"
      className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
    >
      {Array.from({ length: 6 }, (_, index) => (
        <CatalogTrainerCardSkeleton key={index} />
      ))}
    </div>
  );
}
