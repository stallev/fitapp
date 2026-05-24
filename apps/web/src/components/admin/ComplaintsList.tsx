import { CheckCircleIcon } from "lucide-react";

import { ComplaintQueueCard } from "@/components/admin/ComplaintQueueCard";
import { ComplaintRowActions } from "@/components/admin/ComplaintRowActions.client";
import { AdminQueueEmptyState } from "@/components/admin/AdminQueueEmptyState";
import type { ComplaintListItem } from "@/data/admin/list-complaints.server";
import { MESSAGES } from "@/lib/messages";

export type ComplaintsListProps = {
  items: ComplaintListItem[];
  emptyMessage: string;
};

export function ComplaintsList({ items, emptyMessage }: ComplaintsListProps) {
  if (items.length === 0) {
    return (
      <AdminQueueEmptyState
        icon={CheckCircleIcon}
        variant="success"
        title={emptyMessage}
        description={MESSAGES.admin.complaints.emptyAllClearDescription}
        className="md:col-span-2"
      />
    );
  }

  return (
    <ul className="mt-6 grid grid-cols-1 gap-2.5 md:grid-cols-2">
      {items.map((item) => (
        <li key={item.id} className="min-w-0">
          <ComplaintQueueCard
            item={item}
            actions={<ComplaintRowActions item={item} />}
          />
        </li>
      ))}
    </ul>
  );
}
