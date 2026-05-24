import { InfoIcon, CheckCircleIcon } from "lucide-react";

import { COMPLAINT_STATUS } from "@pulse/domain";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MESSAGES } from "@/lib/messages";
import { cn } from "@/lib/utils";

export type ComplaintProcessedBannerProps = {
  status: string;
  assigneeName?: string | null;
};

export function ComplaintProcessedBanner({
  status,
  assigneeName,
}: ComplaintProcessedBannerProps) {
  if (status === COMPLAINT_STATUS.CLOSED) {
    return (
      <Alert
        className={cn(
          "border-[hsl(var(--color-success-container))]/40 bg-[hsl(var(--color-success-container))]/30",
        )}
      >
        <CheckCircleIcon
          className="text-[hsl(var(--color-success))]"
          aria-hidden
        />
        <AlertTitle>{MESSAGES.admin.complaints.statusClosed}</AlertTitle>
        <AlertDescription>
          {MESSAGES.admin.complaints.closeSuccess}
        </AlertDescription>
      </Alert>
    );
  }

  if (status === COMPLAINT_STATUS.IN_REVIEW) {
    const title = assigneeName
      ? MESSAGES.admin.complaints.inReviewBannerAssignee.replace(
          "{name}",
          assigneeName,
        )
      : MESSAGES.admin.complaints.inReviewBanner;

    return (
      <Alert
        className={cn(
          "border-[hsl(var(--color-info-container))]/40 bg-[hsl(var(--color-info-container))]/30",
        )}
      >
        <InfoIcon className="text-[hsl(var(--color-info))]" aria-hidden />
        <AlertTitle>{title}</AlertTitle>
      </Alert>
    );
  }

  return null;
}
