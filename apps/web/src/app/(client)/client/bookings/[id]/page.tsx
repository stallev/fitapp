import type { Metadata } from "next";

import { ClientBookingDetailActions } from "@/components/client/ClientBookingDetailActions.client";
import { ClientBookingDetailPanel } from "@/components/client/ClientBookingDetailPanel";
import { requireClientBookingDetail } from "@/data/client/get-client-booking-detail.server";
import { MESSAGES } from "@/lib/messages";

type ClientBookingDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: MESSAGES.booking.detail.metaTitle,
  };
}

export default async function ClientBookingDetailPage({
  params,
}: ClientBookingDetailPageProps) {
  const { id } = await params;
  const booking = await requireClientBookingDetail(id);

  return (
    <ClientBookingDetailPanel
      booking={booking}
      actions={
        <ClientBookingDetailActions
          bookingId={booking.id}
          priceCents={booking.priceCents}
          canCancel={booking.canCancel}
          canLeaveReview={booking.canLeaveReview}
          canFileComplaint={booking.canFileComplaint}
          canRequestRefund={booking.canRequestRefund}
        />
      }
    />
  );
}
