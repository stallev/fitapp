import {
  DollarSignIcon,
  FlagIcon,
  ShieldIcon,
  UsersIcon,
} from "lucide-react";

import { PulseCardKpi } from "@/components/ui/PulseCardKpi";
import type { AdminDashboardData } from "@/data/admin/get-admin-dashboard.server";
import { formatMoney } from "@/lib/format-money";
import { MESSAGES } from "@/lib/messages";

export type AdminDashboardKpiGridProps = {
  data: AdminDashboardData;
};

export function AdminDashboardKpiGrid({ data }: AdminDashboardKpiGridProps) {
  const oldestTrainerSub =
    data.oldestPendingTrainerDays !== null
      ? MESSAGES.dashboard.adminNeedsAttention.oldestWaiting.replace(
          "{days}",
          String(data.oldestPendingTrainerDays),
        )
      : undefined;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <PulseCardKpi
        icon={<UsersIcon className="size-4" aria-hidden />}
        tone="info"
        value={data.signupsLast30Days}
        label={MESSAGES.dashboard.adminKpi.signups}
      />
      <PulseCardKpi
        icon={<ShieldIcon className="size-4" aria-hidden />}
        tone="primary"
        value={data.pendingTrainers}
        label={MESSAGES.dashboard.adminKpi.pendingTrainers}
        sub={oldestTrainerSub}
      />
      <PulseCardKpi
        icon={<FlagIcon className="size-4" aria-hidden />}
        tone="secondary"
        value={data.openComplaints}
        label={MESSAGES.dashboard.adminKpi.openComplaints}
      />
      <PulseCardKpi
        icon={<DollarSignIcon className="size-4" aria-hidden />}
        tone="success"
        value={formatMoney(data.gmvLast30DaysCents)}
        label={MESSAGES.dashboard.adminKpi.gmv}
      />
    </div>
  );
}
