import type { TrainerStatus } from "@pulse/domain";

import { TrainerApplicationsList } from "@/components/admin/TrainerApplicationsList";
import { listTrainerApplications } from "@/data/admin/list-trainer-applications.server";
import { TRAINER_MODERATION_TABS } from "@/lib/admin/trainer-moderation-tabs";

export type TrainerApplicationsTabPanelProps = {
  status: TrainerStatus;
};

export async function TrainerApplicationsTabPanel({
  status,
}: TrainerApplicationsTabPanelProps) {
  const items = await listTrainerApplications(status);
  const tabConfig = TRAINER_MODERATION_TABS.find((tab) => tab.value === status);

  return (
    <TrainerApplicationsList
      items={items}
      emptyMessage={tabConfig?.emptyMessage ?? ""}
      status={status}
    />
  );
}
