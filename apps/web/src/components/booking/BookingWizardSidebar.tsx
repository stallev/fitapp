import { SummaryCard, type SummaryCardRow } from "@/components/ui/SummaryCard";
import { UserAvatar } from "@/components/ui/UserAvatar";

import {
  formatBookingDateTime,
  formatBookingPrice,
} from "@/lib/booking/booking-wizard-utils";
import type { TrainerServiceItem } from "@/lib/trainer/trainer-profile";
import { MESSAGES } from "@/lib/messages";

export type BookingWizardSidebarProps = {
  trainerName: string;
  trainerPhotoUrl: string | null;
  service: TrainerServiceItem | null;
  startsAtUtc: string | null;
  timezone: string;
  className?: string;
};

export function BookingWizardSidebar({
  trainerName,
  trainerPhotoUrl,
  service,
  startsAtUtc,
  timezone,
  className,
}: BookingWizardSidebarProps) {
  if (!service) {
    return null;
  }

  const rows: SummaryCardRow[] = [
    {
      label: MESSAGES.booking.detail.trainerLabel,
      value: trainerName,
    },
    {
      label: MESSAGES.booking.detail.serviceLabel,
      value: service.name,
    },
  ];

  if (startsAtUtc) {
    rows.push({
      label: MESSAGES.booking.detail.timeLabel,
      value: formatBookingDateTime(startsAtUtc, timezone),
    });
  }

  return (
    <SummaryCard
      title={MESSAGES.booking.wizard.summaryTitle}
      className={className}
      header={
        <div className="flex items-center gap-3">
          <UserAvatar name={trainerName} src={trainerPhotoUrl} size="md" />
          <span className="font-medium">{trainerName}</span>
        </div>
      }
      rows={rows}
      totals={[
        {
          label: MESSAGES.booking.detail.priceLabel,
          value: formatBookingPrice(service.priceCents, service.currency),
        },
      ]}
    />
  );
}
