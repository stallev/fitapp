import { Suspense } from "react";
import { connection } from "next/server";

import { TrainerProfileDetails } from "@/components/trainer/TrainerProfileDetails.server";
import { TrainerProfileHeader } from "@/components/trainer/TrainerProfileHeader";
import { TrainerProfileMainSkeleton } from "@/components/trainer/TrainerProfileMainSkeleton";
import { getPublicTrainerProfile } from "@/data/trainer/get-public-trainer-profile.server";

export type TrainerProfileMainProps = {
  trainerId: string;
};

export async function TrainerProfileMain({
  trainerId,
}: TrainerProfileMainProps) {
  await connection();
  const profile = await getPublicTrainerProfile(trainerId);

  return (
    <div className="space-y-4 pb-28 md:pb-8">
      <TrainerProfileHeader profile={profile} />

      <Suspense fallback={<TrainerProfileMainSkeleton />}>
        <TrainerProfileDetails trainerId={trainerId} />
      </Suspense>
    </div>
  );
}
