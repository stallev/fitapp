import { ClockIcon, DollarSignIcon } from "lucide-react";

import { PulseCardKpi } from "@/components/ui/PulseCardKpi";
import type { AdminRefundsKpi } from "@/data/admin/list-refunds.server";
import { formatMoney } from "@/lib/format-money";
import { MESSAGES } from "@/lib/messages";

export type AdminRefundsKpiGridProps = {
  kpi: AdminRefundsKpi;
};

export function AdminRefundsKpiGrid({ kpi }: AdminRefundsKpiGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
      <PulseCardKpi
        icon={<ClockIcon className="size-4" aria-hidden />}
        tone="primary"
        value={kpi.pendingCount}
        label={MESSAGES.admin.refunds.kpi.inProgress}
      />
      <PulseCardKpi
        icon={<DollarSignIcon className="size-4" aria-hidden />}
        tone="secondary"
        value={formatMoney(kpi.pendingTotalCents)}
        label={MESSAGES.admin.refunds.kpi.pendingAmount}
      />
    </div>
  );
}
