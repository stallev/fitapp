import { CheckCircleIcon } from "lucide-react";

import { Heading } from "@/components/atoms";
import { AdminDashboardHeader } from "@/components/admin/AdminDashboardHeader";
import { AdminDashboardKpiGrid } from "@/components/admin/AdminDashboardKpiGrid";
import {
  AdminNeedsAttentionCard,
  resolveNeedsAttentionIcon,
} from "@/components/admin/AdminNeedsAttentionCard";
import { AdminQueueEmptyState } from "@/components/admin/AdminQueueEmptyState";
import { getAdminDashboardData } from "@/data/admin/get-admin-dashboard.server";
import { formatMoney } from "@/lib/format-money";
import { MESSAGES } from "@/lib/messages";

export default async function AdminDashboardPage() {
  const data = await getAdminDashboardData();

  const needsAttention = [
    data.pendingTrainers > 0
      ? {
          href: "/admin/trainers",
          title: MESSAGES.dashboard.adminNeedsAttention.trainers,
          detail:
            data.oldestPendingTrainerDays !== null
              ? MESSAGES.dashboard.adminNeedsAttention.oldestWaiting.replace(
                  "{days}",
                  String(data.oldestPendingTrainerDays),
                )
              : undefined,
          count: data.pendingTrainers,
          icon: resolveNeedsAttentionIcon("/admin/trainers"),
        }
      : null,
    data.openComplaints > 0
      ? {
          href: "/admin/complaints",
          title: MESSAGES.dashboard.adminNeedsAttention.complaints,
          detail: data.hasHighPriorityComplaint
            ? MESSAGES.dashboard.adminNeedsAttention.highPriority
            : undefined,
          count: data.openComplaints,
          icon: resolveNeedsAttentionIcon("/admin/complaints"),
        }
      : null,
    data.pendingRefunds > 0
      ? {
          href: "/admin/refunds",
          title: MESSAGES.dashboard.adminNeedsAttention.refunds,
          detail: MESSAGES.dashboard.adminNeedsAttention.pendingTotal.replace(
            "{amount}",
            formatMoney(data.pendingRefundsTotalCents),
          ),
          count: data.pendingRefunds,
          icon: resolveNeedsAttentionIcon("/admin/refunds"),
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <div className="space-y-8">
      <AdminDashboardHeader />
      <AdminDashboardKpiGrid data={data} />

      <section className="space-y-3">
        <Heading as="h2" visualLevel="h4">
          {MESSAGES.dashboard.adminNeedsAttention.title}
        </Heading>

        {needsAttention.length === 0 ? (
          <AdminQueueEmptyState
            icon={CheckCircleIcon}
            variant="success"
            title={MESSAGES.dashboard.adminNeedsAttention.allClear}
            description={MESSAGES.empty.adminDashboard.description}
          />
        ) : (
          <AdminNeedsAttentionCard items={needsAttention} />
        )}
      </section>
    </div>
  );
}
