import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { ClientDashboardCategories } from "@/components/client/ClientDashboardCategories";
import { ClientDashboardGreeting } from "@/components/client/ClientDashboardGreeting";
import {
  ClientDashboardSearchEntry,
  ClientNextSessionCard,
} from "@/components/client/ClientNextSessionCard";
import { ClientDashboardTipCard } from "@/components/client/ClientDashboardTipCard";
import { getClientNextSession } from "@/data/client/get-client-bookings.server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Главная — Pulse",
  };
}

export default async function ClientDashboardPage() {
  const session = await auth();
  const displayName = session?.user?.name?.trim() || "Клиент";
  const nextSession = await getClientNextSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 pb-6 md:max-w-none md:space-y-6 lg:max-w-4xl">
      <ClientDashboardGreeting name={displayName} />
      <ClientDashboardSearchEntry />
      <ClientNextSessionCard session={nextSession} />
      <ClientDashboardTipCard />
      <ClientDashboardCategories />
    </div>
  );
}
