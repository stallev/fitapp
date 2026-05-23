import { TopBarFallback } from "@/components/shell/TopBarFallback";
import { Skeleton } from "@/components/ui/skeleton";

export function AppShellFallback() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <TopBarFallback />
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-52 shrink-0 border-r border-border p-4 md:block lg:w-60">
          <Skeleton className="mb-4 h-4 w-24" />
          <div className="space-y-2">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-11 w-full rounded-full" />
            ))}
          </div>
        </aside>
        <main className="flex-1 p-4 md:p-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-6 h-40 w-full rounded-xl" />
        </main>
      </div>
    </div>
  );
}
