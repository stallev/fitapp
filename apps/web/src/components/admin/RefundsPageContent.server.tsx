import { ContentText } from "@/components/atoms";
import { AdminRefundsKpiGrid } from "@/components/admin/AdminRefundsKpiGrid";
import { RefundsList } from "@/components/admin/RefundsList";
import {
  getAdminRefundsKpi,
  listPendingRefunds,
} from "@/data/admin/list-refunds.server";
import { MESSAGES } from "@/lib/messages";

export async function RefundsPageContent() {
  const [kpi, refunds] = await Promise.all([
    getAdminRefundsKpi(),
    listPendingRefunds(),
  ]);

  return (
    <div className="space-y-6">
      <ContentText as="p" className="text-sm text-muted-foreground">
        {MESSAGES.admin.refunds.manualNote}
      </ContentText>
      <AdminRefundsKpiGrid kpi={kpi} />
      <RefundsList refunds={refunds} />
    </div>
  );
}
