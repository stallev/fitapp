import { ClientNextSessionCard } from "@/components/client/ClientNextSessionCard";
import { getClientNextSession } from "@/data/client/get-client-bookings.server";

export async function ClientNextSessionSection() {
  const nextSession = await getClientNextSession();
  return <ClientNextSessionCard session={nextSession} />;
}
