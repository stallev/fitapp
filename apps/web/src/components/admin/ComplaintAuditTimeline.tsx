import { ContentText, SectionTitle } from "@/components/atoms";
import { PulseCard, PulseCardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ComplaintAuditEntry } from "@/data/admin/get-complaint-detail.server";
import { getComplaintResolutionBadge } from "@/lib/admin/complaint-badges";
import { formatAdminRelativeDate } from "@/lib/date/format-admin-relative";
import { MESSAGES } from "@/lib/messages";

export type ComplaintAuditTimelineProps = {
  entries: ComplaintAuditEntry[];
};

function getAuditActionLabel(action: string): string {
  if (action === "complaint.review_started") {
    return MESSAGES.admin.complaints.auditReviewStarted;
  }

  if (action === "complaint.closed") {
    return MESSAGES.admin.complaints.auditClosed;
  }

  return action;
}

export function ComplaintAuditTimeline({ entries }: ComplaintAuditTimelineProps) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <PulseCard variant="base" className="rounded-2xl">
      <PulseCardContent density="sm" className="space-y-3">
        <SectionTitle>{MESSAGES.admin.complaints.auditTitle}</SectionTitle>
        <ul className="space-y-3">
          {entries.map((entry) => {
            const resolutionBadge = entry.resolution
              ? getComplaintResolutionBadge(entry.resolution)
              : null;

            return (
              <li
                key={entry.id}
                className="flex flex-wrap items-start justify-between gap-2 border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <ContentText as="p" className="text-sm font-medium">
                    {getAuditActionLabel(entry.action)}
                  </ContentText>
                  {entry.actorName ? (
                    <ContentText as="p" className="text-sm text-muted-foreground">
                      {entry.actorName}
                    </ContentText>
                  ) : null}
                  {resolutionBadge ? (
                    <StatusBadge status={resolutionBadge.variant}>
                      {resolutionBadge.label}
                    </StatusBadge>
                  ) : null}
                </div>
                <ContentText
                  as="span"
                  className="text-[11.5px] text-muted-foreground"
                >
                  {formatAdminRelativeDate(entry.createdAt)}
                </ContentText>
              </li>
            );
          })}
        </ul>
      </PulseCardContent>
    </PulseCard>
  );
}
