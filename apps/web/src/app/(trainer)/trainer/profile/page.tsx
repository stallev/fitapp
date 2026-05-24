import type { Metadata } from "next";

import { TrainerProfileEditForm } from "@/components/trainer/TrainerProfileEditForm.client";
import { getTrainerProfileForEdit } from "@/data/trainer/get-trainer-profile-for-edit.server";
import { MESSAGES } from "@/lib/messages";

export const metadata: Metadata = {
  title: MESSAGES.trainer.editProfile.metaTitle,
};

export default async function TrainerProfilePage() {
  const profile = await getTrainerProfileForEdit();

  return <TrainerProfileEditForm profile={profile} />;
}
