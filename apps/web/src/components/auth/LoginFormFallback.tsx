import { Skeleton } from "@/components/ui/skeleton";

export function LoginFormFallback() {
  return (
    <div className="space-y-4" aria-busy="true">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-11 w-full rounded-full" />
    </div>
  );
}
