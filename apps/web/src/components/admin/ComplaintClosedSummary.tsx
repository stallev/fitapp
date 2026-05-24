import { ContentText, SectionTitle } from "@/components/atoms";
import { PulseCard, PulseCardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ComplaintDetail } from "@/data/admin/get-complaint-detail.server";
import { getComplaintResolutionBadge } from "@/lib/admin/complaint-badges";
import { formatAdminRelativeDate } from "@/lib/date/format-admin-relative";
import { MESSAGES } from "@/lib/messages";

export type ComplaintClosedSummaryProps = {
  complaint: ComplaintDetail;
};

export function ComplaintClosedSummary({
  complaint,
}: ComplaintClosedSummaryProps) {
  if (!complaint.resolution) {
    return null;
  }

  const resolutionBadge = getComplaintResolutionBadge(complaint.resolution);

  return (
    <PulseCard variant="base" className="rounded-2xl">
      <PulseCardContent density="sm" className="space-y-3">
        <SectionTitle>{MESSAGES.admin.complaints.closedSummaryTitle}</SectionTitle>

        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={resolutionBadge.variant}>
            {resolutionBadge.label}
          </StatusBadge>
        </div>

        {complaint.adminNotes ? (
          <div className="space-y-1">
            <ContentText as="p" className="text-sm text-muted-foreground">
              {MESSAGES.admin.complaints.adminNotes}
            </ContentText>
            <ContentText as="p" className="text-sm">
              {complaint.adminNotes}
            </ContentText>
          </div>
        ) : null}

        <dl className="grid gap-2 text-sm">
          {complaint.resolvedByName ? (
            <div className="flex flex-wrap gap-2">
              <dt className="text-muted-foreground">
                {MESSAGES.admin.complaints.closedBy}
              </dt>
              <dd>{complaint.resolvedByName}</dd>
            </div>
          ) : null}
          {complaint.resolvedAt ? (
            <div className="flex flex-wrap gap-2">
              <dt className="text-muted-foreground">
                {MESSAGES.admin.complaints.closedAt}
              </dt>
              <dd>{formatAdminRelativeDate(complaint.resolvedAt)}</dd>
            </div>
          ) : null}
        </dl>
      </PulseCardContent>
    </PulseCard>
  );
}
