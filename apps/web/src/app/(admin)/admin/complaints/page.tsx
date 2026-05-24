import { Suspense } from "react";

import { COMPLAINT_STATUS } from "@pulse/domain";

import { AdminPillTabs } from "@/components/admin/AdminPillTabs.client";
import { AdminQueueGridSkeleton } from "@/components/admin/AdminQueueGridSkeleton";
import { ComplaintsTabPanel } from "@/components/admin/ComplaintsTabPanel.server";
import { PageHeader } from "@/components/ui/PageHeader";
import { getComplaintCounts } from "@/data/admin/list-complaints.server";
import { COMPLAINT_MODERATION_TABS, resolveComplaintTab } from "@/lib/admin/complaint-moderation-tabs";
import { MESSAGES } from "@/lib/messages";

type AdminComplaintsPageProps = {
  searchParams: Promise<{ tab?: string }>;
};

export default async function AdminComplaintsPage({
  searchParams,
}: AdminComplaintsPageProps) {
  const params = await searchParams;
  const activeTab = resolveComplaintTab(params.tab);
  const counts = await getComplaintCounts();

  const tabs = COMPLAINT_MODERATION_TABS.map((tab) => ({
    value: tab.value,
    label: tab.label,
  }));

  return (
    <>
      <PageHeader title={MESSAGES.admin.complaints.title} />

      <AdminPillTabs
        activeTab={activeTab}
        tabs={tabs}
        counts={counts}
        basePath="/admin/complaints"
        defaultTab={COMPLAINT_STATUS.OPEN}
        ariaLabel={MESSAGES.admin.complaints.tabsAriaLabel}
      >
        <Suspense fallback={<AdminQueueGridSkeleton count={4} />}>
          <ComplaintsTabPanel status={activeTab} />
        </Suspense>
      </AdminPillTabs>
    </>
  );
}
