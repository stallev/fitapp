import { TRAINER_STATUS } from "@pulse/domain";

import { MESSAGES } from "@/lib/messages";
import type { StatusBadgeVariant } from "@/lib/ui/status-badge";

export function getTrainerStatusBadge(status: string): {
  variant: StatusBadgeVariant;
  label: string;
} {
  if (status === TRAINER_STATUS.PENDING) {
    return {
      variant: "pending",
      label: MESSAGES.admin.moderation.statusPendingReview,
    };
  }

  if (status === TRAINER_STATUS.APPROVED) {
    return {
      variant: "confirmed",
      label: MESSAGES.admin.moderation.statusApproved,
    };
  }

  if (status === TRAINER_STATUS.REJECTED) {
    return {
      variant: "cancelled",
      label: MESSAGES.admin.moderation.statusRejected,
    };
  }

  return { variant: "neutral", label: status };
}
