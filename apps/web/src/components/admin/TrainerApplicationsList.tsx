import { CheckCircleIcon, ShieldIcon } from "lucide-react";
import { TRAINER_STATUS, type TrainerStatus } from "@pulse/domain";

import { ModerationQueueRow } from "@/components/admin/ModerationQueueRow";
import { Button } from "@/components/ui/button";
import { CustomLink } from "@/components/ui/CustomLink";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { TrainerApplicationListItem } from "@/data/admin/list-trainer-applications.server";
import { MESSAGES } from "@/lib/messages";

export type TrainerApplicationsListProps = {
  items: TrainerApplicationListItem[];
  emptyMessage: string;
  status: TrainerStatus;
};

function TrainerApplicationsEmptyState({
  emptyMessage,
  status,
}: Pick<TrainerApplicationsListProps, "emptyMessage" | "status">) {
  const isPending = status === TRAINER_STATUS.PENDING;

  return (
    <Empty className="mt-6 border-border bg-card md:col-span-2 xl:col-span-3">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {isPending ? (
            <CheckCircleIcon aria-hidden />
          ) : (
            <ShieldIcon aria-hidden />
          )}
        </EmptyMedia>
        <EmptyTitle>{emptyMessage}</EmptyTitle>
        {isPending ? (
          <EmptyDescription>
            {MESSAGES.dashboard.adminNeedsAttention.allClear}
          </EmptyDescription>
        ) : null}
      </EmptyHeader>
      {!isPending ? (
        <EmptyContent>
          <Button asChild variant="outline">
            <CustomLink href="/admin/trainers">
              {MESSAGES.admin.moderation.viewPendingQueue}
            </CustomLink>
          </Button>
        </EmptyContent>
      ) : null}
    </Empty>
  );
}

export function TrainerApplicationsList({
  items,
  emptyMessage,
  status,
}: TrainerApplicationsListProps) {
  if (items.length === 0) {
    return (
      <TrainerApplicationsEmptyState
        emptyMessage={emptyMessage}
        status={status}
      />
    );
  }

  return (
    <ul className="mt-6 grid grid-cols-1 gap-2.5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <li key={item.id} className="min-w-0">
          <ModerationQueueRow
            item={item}
            href={`/admin/trainers/${item.id}`}
          />
        </li>
      ))}
    </ul>
  );
}
