"use client";

import { useRouter } from "next/navigation";
import type { TrainerStatus } from "@pulse/domain";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  formatModerationTabLabel,
  TRAINER_MODERATION_TABS,
} from "@/lib/admin/trainer-moderation-tabs";
import { MESSAGES } from "@/lib/messages";
import { cn } from "@/lib/utils";

export type AdminTrainersTabsProps = {
  activeTab: TrainerStatus;
  counts: Record<TrainerStatus, number>;
  children: React.ReactNode;
};

export function AdminTrainersTabs({
  activeTab,
  counts,
  children,
}: AdminTrainersTabsProps) {
  const router = useRouter();

  const handleTabChange = (value: string) => {
    const nextUrl =
      value === TRAINER_MODERATION_TABS[0]?.value
        ? "/admin/trainers"
        : `/admin/trainers?tab=${value}`;
    router.replace(nextUrl);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
      <TabsList
        variant="pill"
        aria-label={MESSAGES.admin.moderation.tabsAriaLabel}
        className={cn(
          "max-w-full",
          "w-fit",
          "-mx-4 overflow-x-auto px-4 no-scrollbar",
          "md:mx-0 md:px-0 md:overflow-visible",
        )}
      >
        {TRAINER_MODERATION_TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {formatModerationTabLabel(tab.label, counts[tab.value])}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={activeTab}>{children}</TabsContent>
    </Tabs>
  );
}
