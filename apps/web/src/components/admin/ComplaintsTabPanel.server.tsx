import type { ComplaintStatus } from "@pulse/domain";

import { ComplaintsList } from "@/components/admin/ComplaintsList";
import { listComplaintsWithAssignees } from "@/data/admin/list-complaints.server";
import { COMPLAINT_MODERATION_TABS } from "@/lib/admin/complaint-moderation-tabs";

export type ComplaintsTabPanelProps = {
  status: ComplaintStatus;
};

export async function ComplaintsTabPanel({ status }: ComplaintsTabPanelProps) {
  const items = await listComplaintsWithAssignees(status);
  const tabConfig = COMPLAINT_MODERATION_TABS.find((tab) => tab.value === status);

  return (
    <ComplaintsList
      items={items}
      emptyMessage={tabConfig?.emptyMessage ?? ""}
    />
  );
}
