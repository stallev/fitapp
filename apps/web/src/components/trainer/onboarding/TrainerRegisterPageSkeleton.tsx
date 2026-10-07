import { Skeleton } from "@/components/ui/skeleton";

export function TrainerRegisterPageSkeleton() {
  return (
    <div
      className="mx-auto w-full max-w-2xl px-4 md:px-0"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-11 w-full rounded-full" />
      </div>
    </div>
  );
}
