import { COMPLAINT_STATUS, type ComplaintStatus } from "@pulse/domain";

import { MESSAGES } from "@/lib/messages";

export type ComplaintModerationTabConfig = {
  value: ComplaintStatus;
  label: string;
  emptyMessage: string;
};

export const COMPLAINT_MODERATION_TABS: ComplaintModerationTabConfig[] = [
  {
    value: COMPLAINT_STATUS.OPEN,
    label: MESSAGES.admin.complaints.tabs.open,
    emptyMessage: MESSAGES.admin.complaints.emptyOpen,
  },
  {
    value: COMPLAINT_STATUS.IN_REVIEW,
    label: MESSAGES.admin.complaints.tabs.inReview,
    emptyMessage: MESSAGES.admin.complaints.emptyInReview,
  },
];

export function resolveComplaintTab(
  tabParam: string | undefined,
): ComplaintStatus {
  return (
    COMPLAINT_MODERATION_TABS.find((tab) => tab.value === tabParam)?.value ??
    COMPLAINT_STATUS.OPEN
  );
}
