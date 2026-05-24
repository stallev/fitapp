import type { Metadata } from "next";

import { TrainerServicesList } from "@/components/trainer/TrainerServicesList.client";
import { getTrainerServicesForEdit } from "@/data/trainer/get-trainer-services-for-edit.server";
import { MESSAGES } from "@/lib/messages";

export const metadata: Metadata = {
  title: MESSAGES.trainer.services.metaTitle,
};

export default async function TrainerServicesPage() {
  const { services } = await getTrainerServicesForEdit();

  return <TrainerServicesList initialServices={services} />;
}
