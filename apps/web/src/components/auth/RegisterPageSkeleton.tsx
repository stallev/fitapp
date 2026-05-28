import { Skeleton } from "@/components/ui/skeleton";

export function RegisterPageSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true">
      <Skeleton className="mx-auto mb-6 h-9 w-48" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-11 w-full rounded-full" />
    </div>
  );
}
