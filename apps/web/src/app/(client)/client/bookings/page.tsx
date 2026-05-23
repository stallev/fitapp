import type { Metadata } from "next";

import { ClientBookingsPanel } from "@/components/client/ClientBookingsPanel.client";
import { Heading } from "@/components/atoms";
import { getClientBookings } from "@/data/client/get-client-bookings.server";
import { MESSAGES } from "@/lib/messages";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: MESSAGES.booking.list.metaTitle,
  };
}

export default async function ClientBookingsPage() {
  const bookings = await getClientBookings();

  return (
    <div className="space-y-4 pb-6 md:max-w-5xl">
      <Heading as="h1" visualLevel="h2">
        {MESSAGES.booking.list.title}
      </Heading>
      <ClientBookingsPanel bookings={bookings} />
    </div>
  );
}
