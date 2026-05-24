import { TRAINER_STATUS, type TrainerStatus } from "@pulse/domain";

import { MESSAGES } from "@/lib/messages";

export type TrainerModerationTabConfig = {
  value: TrainerStatus;
  label: string;
  emptyMessage: string;
};

export const TRAINER_MODERATION_TABS: TrainerModerationTabConfig[] = [
  {
    value: TRAINER_STATUS.PENDING,
    label: MESSAGES.admin.moderation.tabs.pending,
    emptyMessage: MESSAGES.admin.moderation.emptyPending,
  },
  {
    value: TRAINER_STATUS.APPROVED,
    label: MESSAGES.admin.moderation.tabs.approved,
    emptyMessage: MESSAGES.admin.moderation.emptyApproved,
  },
  {
    value: TRAINER_STATUS.REJECTED,
    label: MESSAGES.admin.moderation.tabs.rejected,
    emptyMessage: MESSAGES.admin.moderation.emptyRejected,
  },
];

export function resolveTrainerModerationTab(
  tabParam: string | undefined,
): TrainerStatus {
  return (
    TRAINER_MODERATION_TABS.find((tab) => tab.value === tabParam)?.value ??
    TRAINER_STATUS.PENDING
  );
}

export { formatModerationTabLabel } from "@/lib/admin/format-tab-label";
