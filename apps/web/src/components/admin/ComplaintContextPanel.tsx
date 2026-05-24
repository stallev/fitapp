import { ContentText, SectionTitle } from "@/components/atoms";
import { PulseCard, PulseCardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CustomLink } from "@/components/ui/CustomLink";
import type { ComplaintDetail } from "@/data/admin/get-complaint-detail.server";
import { formatBookingReference } from "@/lib/admin/format-booking-reference";
import { formatBookingDateTimeLocal } from "@/lib/booking/format-booking-datetime-local";
import {
  getBookingStatusBadgeVariant,
  getBookingStatusLabel,
} from "@/lib/booking/booking-status-ui";
import { formatMoney } from "@/lib/format-money";
import { MESSAGES } from "@/lib/messages";
import type { BookingStatus } from "@pulse/domain";

export type ComplaintContextPanelProps = {
  complaint: ComplaintDetail;
};

function getRefundStatusLabel(status: string): string {
  if (status === "pending") {
    return MESSAGES.admin.refunds.pendingStatus;
  }

  if (status === "approved") {
    return MESSAGES.admin.refunds.approveSuccess;
  }

  if (status === "rejected") {
    return MESSAGES.admin.refunds.rejectSuccess;
  }

  return status;
}

export function ComplaintContextPanel({ complaint }: ComplaintContextPanelProps) {
  return (
    <PulseCard variant="base" className="rounded-2xl">
      <PulseCardContent density="sm" className="space-y-4">
        <SectionTitle>{MESSAGES.admin.complaints.contextTitle}</SectionTitle>

        {complaint.booking ? (
          <dl className="grid gap-2 text-sm">
            <div>
              <dt className="text-muted-foreground">
                {MESSAGES.admin.complaints.booking}
              </dt>
              <dd className="space-y-1">
                <ContentText as="p" className="font-mono text-[13px]">
                  {MESSAGES.admin.complaints.bookingReference.replace(
                    "{ref}",
                    formatBookingReference(complaint.booking.id),
                  )}
                </ContentText>
                <ContentText as="p">
                  {complaint.booking.serviceName} ·{" "}
                  {formatBookingDateTimeLocal(complaint.booking.startsAt)}
                </ContentText>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge
                    status={getBookingStatusBadgeVariant(
                      complaint.booking.status as BookingStatus,
                    )}
                  >
                    {getBookingStatusLabel(
                      complaint.booking.status as BookingStatus,
                    )}
                  </StatusBadge>
                  <ContentText as="span" className="text-muted-foreground">
                    {formatMoney(
                      complaint.booking.priceCents,
                      complaint.booking.currency,
                    )}
                  </ContentText>
                </div>
              </dd>
            </div>
          </dl>
        ) : (
          <ContentText as="p" className="text-sm text-muted-foreground">
            {MESSAGES.admin.complaints.noBooking}
          </ContentText>
        )}

        <div className="space-y-1 text-sm">
          <ContentText as="p" className="text-muted-foreground">
            {MESSAGES.admin.complaints.relatedRefund}
          </ContentText>
          {complaint.relatedRefund ? (
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status="pending">
                {getRefundStatusLabel(complaint.relatedRefund.status)}
              </StatusBadge>
              <ContentText as="span">
                {formatMoney(
                  complaint.relatedRefund.amountCents,
                  complaint.relatedRefund.currency,
                )}
              </ContentText>
              <CustomLink
                href="/admin/refunds"
                className="text-sm font-medium text-primary"
              >
                {MESSAGES.admin.complaints.viewRefunds}
              </CustomLink>
            </div>
          ) : (
            <ContentText as="p" className="text-muted-foreground">
              {MESSAGES.admin.complaints.noRefund}
            </ContentText>
          )}
        </div>
      </PulseCardContent>
    </PulseCard>
  );
}
