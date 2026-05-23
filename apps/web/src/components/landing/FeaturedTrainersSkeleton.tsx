import { PulseCard } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function FeaturedTrainerCardSkeleton() {
  return (
    <PulseCard variant="row" className="min-w-[280px] shrink-0 md:min-w-0">
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

export function FeaturedTrainersSkeleton() {
  return (
    <section aria-busy="true" aria-label="Loading featured trainers" className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0">
        {Array.from({ length: 3 }, (_, index) => (
          <FeaturedTrainerCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
