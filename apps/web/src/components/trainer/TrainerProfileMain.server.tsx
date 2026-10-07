import { Suspense } from "react";

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
  const profile = await getPublicTrainerProfile(trainerId);

  return (
    <div className="space-y-4 pb-28 md:pb-8">
      <TrainerProfileHeader profile={profile} />

      <Suspense fallback={<TrainerProfileMainSkeleton />}>
        <TrainerProfileDetails profile={profile} />
      </Suspense>
    </div>
  );
}
