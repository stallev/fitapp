import { COMPLAINT_STATUS } from "@pulse/domain";

import { ContentText } from "@/components/atoms";
import { PulseCard, PulseCardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ComplaintListItem } from "@/data/admin/list-complaints.server";
import { getComplaintPriorityBadge } from "@/lib/admin/complaint-badges";
import { computeWaitingDays } from "@/lib/admin/compute-waiting-days";
import { formatAdminRelativeDate } from "@/lib/date/format-admin-relative";
import { MESSAGES } from "@/lib/messages";

export type ComplaintQueueCardProps = {
  item: ComplaintListItem;
  actions: React.ReactNode;
};

export function ComplaintQueueCard({ item, actions }: ComplaintQueueCardProps) {
  const priorityBadge = getComplaintPriorityBadge(item.priority);

  return (
    <PulseCard variant="base" className="h-full rounded-2xl">
      <PulseCardContent density="sm" className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={priorityBadge.variant}>
            {priorityBadge.label}
          </StatusBadge>
          <ContentText as="span" className="text-[11.5px] text-muted-foreground">
            · {formatAdminRelativeDate(item.createdAt)}
          </ContentText>
        </div>

        <div className="space-y-1 text-sm">
          <ContentText as="p">
            <span className="text-muted-foreground">
              {MESSAGES.admin.complaints.fromLabel}
            </span>{" "}
            {item.reporterName}
          </ContentText>
          {item.trainerName ? (
            <ContentText as="p">
              <span className="text-muted-foreground">
                {MESSAGES.admin.complaints.onLabel}
              </span>{" "}
              {item.trainerName}
            </ContentText>
          ) : null}
        </div>

        <ContentText as="p" className="line-clamp-2 text-sm font-medium">
          {item.reason}
        </ContentText>

        {item.status === COMPLAINT_STATUS.IN_REVIEW && item.assigneeName ? (
          <ContentText as="p" className="text-xs text-muted-foreground">
            {MESSAGES.admin.complaints.assigneeLine.replace(
              "{name}",
              item.assigneeName,
            )}
            {item.reviewStartedAt
              ? ` · ${MESSAGES.admin.complaints.daysInReview.replace(
                  "{days}",
                  String(computeWaitingDays(item.reviewStartedAt)),
                )}`
              : ""}
          </ContentText>
        ) : null}

        <div className="flex flex-wrap gap-2">{actions}</div>
      </PulseCardContent>
    </PulseCard>
  );
}
