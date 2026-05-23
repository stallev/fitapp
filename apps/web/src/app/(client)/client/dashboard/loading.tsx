import { Skeleton } from "@/components/ui/skeleton";

export default function ClientDashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 pb-6 lg:max-w-4xl">
      <Skeleton className="h-16 w-64" />
      <Skeleton className="h-14 w-full rounded-full" />
      <Skeleton className="h-40 w-full rounded-2xl" />
      <Skeleton className="h-24 w-full rounded-2xl" />
      <Skeleton className="h-32 w-full rounded-2xl" />
    </div>
  );
}
