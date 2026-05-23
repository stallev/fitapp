import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ClientProfilePanel } from "@/components/client/ClientProfilePanel";
import { getClientProfile } from "@/data/client/get-client-profile.server";
import { MESSAGES } from "@/lib/messages";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: MESSAGES.profile.client.metaTitle,
  };
}

export default async function ClientProfilePage() {
  const profile = await getClientProfile();

  if (!profile) {
    notFound();
  }

  return <ClientProfilePanel profile={profile} />;
}
