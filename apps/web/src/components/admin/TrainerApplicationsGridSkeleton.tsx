import { ModerationQueueRowSkeleton } from "@/components/admin/ModerationQueueRowSkeleton";
import { MESSAGES } from "@/lib/messages";
import { cn } from "@/lib/utils";

export type TrainerApplicationsGridSkeletonProps = {
  className?: string;
};

export function TrainerApplicationsGridSkeleton({
  className,
}: TrainerApplicationsGridSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label={MESSAGES.admin.moderation.loadingQueue}
      className={cn(
        "mt-6 grid grid-cols-1 gap-2.5 md:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {Array.from({ length: 6 }, (_, index) => (
        <ModerationQueueRowSkeleton key={index} />
      ))}
    </div>
  );
}
