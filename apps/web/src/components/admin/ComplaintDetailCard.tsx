import { ContentText } from "@/components/atoms";
import { PulseCard, PulseCardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ComplaintDetail } from "@/data/admin/get-complaint-detail.server";
import {
  getComplaintPriorityBadge,
  getComplaintStatusBadge,
} from "@/lib/admin/complaint-badges";
import { formatBookingReference } from "@/lib/admin/format-booking-reference";
import { formatAdminRelativeDate } from "@/lib/date/format-admin-relative";
import { MESSAGES } from "@/lib/messages";

export type ComplaintDetailCardProps = {
  complaint: ComplaintDetail;
};

export function ComplaintDetailCard({ complaint }: ComplaintDetailCardProps) {
  const priorityBadge = getComplaintPriorityBadge(complaint.priority);
  const statusBadge = getComplaintStatusBadge(complaint.status);

  return (
    <PulseCard variant="base" className="rounded-2xl">
      <PulseCardContent density="sm" className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={priorityBadge.variant}>
            {priorityBadge.label}
          </StatusBadge>
          <StatusBadge status={statusBadge.variant}>
            {statusBadge.label}
          </StatusBadge>
          <ContentText as="span" className="text-[11.5px] text-muted-foreground">
            · {formatAdminRelativeDate(complaint.createdAt)}
          </ContentText>
        </div>

        <div className="space-y-1 text-sm">
          <ContentText as="p">
            <span className="text-muted-foreground">
              {MESSAGES.admin.complaints.fromLabel}
            </span>{" "}
            {complaint.reporterName}
          </ContentText>
          {complaint.trainerName ? (
            <ContentText as="p">
              <span className="text-muted-foreground">
                {MESSAGES.admin.complaints.onLabel}
              </span>{" "}
              {complaint.trainerName}
            </ContentText>
          ) : null}
        </div>

        <ContentText as="p" className="text-sm font-medium">
          {complaint.reason}
        </ContentText>

        {complaint.bookingId ? (
          <dl className="grid gap-3 text-sm md:max-w-xl">
            <div>
              <dt className="text-muted-foreground">
                {MESSAGES.admin.complaints.booking}
              </dt>
              <dd
                title={complaint.bookingId}
                className="font-mono text-[13px]"
              >
                {MESSAGES.admin.complaints.bookingReference.replace(
                  "{ref}",
                  formatBookingReference(complaint.bookingId),
                )}
              </dd>
            </div>
          </dl>
        ) : null}
      </PulseCardContent>
    </PulseCard>
  );
}
