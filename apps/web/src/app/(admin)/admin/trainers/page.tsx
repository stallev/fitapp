import { Suspense } from "react";

import { AdminTrainersTabs } from "@/components/admin/AdminTrainersTabs.client";
import { TrainerApplicationsGridSkeleton } from "@/components/admin/TrainerApplicationsGridSkeleton";
import { TrainerApplicationsTabPanel } from "@/components/admin/TrainerApplicationsTabPanel.server";
import { PageHeader } from "@/components/ui/PageHeader";
import { getTrainerApplicationCounts } from "@/data/admin/list-trainer-applications.server";
import { resolveTrainerModerationTab } from "@/lib/admin/trainer-moderation-tabs";
import { MESSAGES } from "@/lib/messages";

type AdminTrainersPageProps = {
  searchParams: Promise<{ tab?: string }>;
};

export default async function AdminTrainersPage({
  searchParams,
}: AdminTrainersPageProps) {
  const params = await searchParams;
  const activeTab = resolveTrainerModerationTab(params.tab);
  const counts = await getTrainerApplicationCounts();

  return (
    <>
      <PageHeader title={MESSAGES.admin.moderation.title} />

      <AdminTrainersTabs activeTab={activeTab} counts={counts}>
        <Suspense fallback={<TrainerApplicationsGridSkeleton />}>
          <TrainerApplicationsTabPanel status={activeTab} />
        </Suspense>
      </AdminTrainersTabs>
    </>
  );
}
