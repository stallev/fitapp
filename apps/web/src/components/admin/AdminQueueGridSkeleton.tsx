import { ModerationQueueRowSkeleton } from "@/components/admin/ModerationQueueRowSkeleton";
import { MESSAGES } from "@/lib/messages";
import { cn } from "@/lib/utils";

export type AdminQueueGridSkeletonProps = {
  count?: number;
  className?: string;
};

export function AdminQueueGridSkeleton({
  count = 4,
  className,
}: AdminQueueGridSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label={MESSAGES.admin.shared.loadingQueue}
      className={cn(
        "mt-6 grid grid-cols-1 gap-2.5 md:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {Array.from({ length: count }, (_, index) => (
        <ModerationQueueRowSkeleton key={index} />
      ))}
    </div>
  );
}
