import { CheckCircleIcon } from "lucide-react";

import { AdminQueueEmptyState } from "@/components/admin/AdminQueueEmptyState";
import { RefundQueueCard } from "@/components/admin/RefundQueueCard";
import type { RefundListItem } from "@/data/admin/list-refunds.server";
import { MESSAGES } from "@/lib/messages";

export type RefundsListProps = {
  refunds: RefundListItem[];
};

export function RefundsList({ refunds }: RefundsListProps) {
  if (refunds.length === 0) {
    return (
      <AdminQueueEmptyState
        icon={CheckCircleIcon}
        variant="success"
        title={MESSAGES.admin.refunds.empty}
        description={MESSAGES.dashboard.adminNeedsAttention.allClear}
        className="md:col-span-2"
      />
    );
  }

  return (
    <ul className="mt-6 grid grid-cols-1 gap-2.5 md:grid-cols-2">
      {refunds.map((refund) => (
        <li key={refund.id} className="min-w-0">
          <RefundQueueCard refund={refund} />
        </li>
      ))}
    </ul>
  );
}
