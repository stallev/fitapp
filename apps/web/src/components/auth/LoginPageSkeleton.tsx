import { Skeleton } from "@/components/ui/skeleton";

export function LoginPageSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true">
      <Skeleton className="mx-auto mb-6 h-9 w-40" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-11 w-full rounded-full" />
    </div>
  );
}
