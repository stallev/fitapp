import { Suspense } from "react";

import { TrainerRegisterPageContent } from "@/components/trainer/onboarding/TrainerRegisterPageContent.server";
import { TrainerRegisterPageSkeleton } from "@/components/trainer/onboarding/TrainerRegisterPageSkeleton";
import { MESSAGES } from "@/lib/messages";

export const metadata = {
  title: MESSAGES.trainer.onboarding.title,
};

type TrainerRegisterPageProps = {
  searchParams: Promise<{ step?: string }>;
};

export default function TrainerRegisterPage({
  searchParams,
}: TrainerRegisterPageProps) {
  return (
    <div className="flex flex-1 flex-col py-4 md:py-8">
      <Suspense fallback={<TrainerRegisterPageSkeleton />}>
        <TrainerRegisterPageContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
