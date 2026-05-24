import {
  COMPLAINT_RESOLUTION,
  COMPLAINT_RESOLUTIONS,
  type ComplaintResolution,
} from "@pulse/domain";

import { MESSAGES } from "@/lib/messages";

const RESOLUTION_LABELS: Record<ComplaintResolution, string> = {
  [COMPLAINT_RESOLUTION.NO_ACTION]:
    MESSAGES.admin.complaints.resolution.noAction,
  [COMPLAINT_RESOLUTION.WARNING_TO_TRAINER]:
    MESSAGES.admin.complaints.resolution.warningToTrainer,
  [COMPLAINT_RESOLUTION.REFUND_RECOMMENDED]:
    MESSAGES.admin.complaints.resolution.refundRecommended,
  [COMPLAINT_RESOLUTION.DUPLICATE]:
    MESSAGES.admin.complaints.resolution.duplicate,
  [COMPLAINT_RESOLUTION.SPAM]: MESSAGES.admin.complaints.resolution.spam,
};

export function getComplaintResolutionOptions(): Array<{
  value: ComplaintResolution;
  label: string;
}> {
  return COMPLAINT_RESOLUTIONS.map((value) => ({
    value,
    label: RESOLUTION_LABELS[value],
  }));
}
