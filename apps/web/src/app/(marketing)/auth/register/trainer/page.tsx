import { redirect } from "next/navigation";

import { TRAINER_STATUS, USER_ROLE } from "@pulse/domain";
import { getRoleHome } from "@pulse/policy-edge";

import { TrainerOnboardingWizard } from "@/components/trainer/onboarding/TrainerOnboardingWizard.client";
import { getTrainerOnboardingDraft } from "@/data/trainer/get-trainer-onboarding-draft.server";
import { auth } from "@/auth";
import { MESSAGES } from "@/lib/messages";

export const metadata = {
  title: MESSAGES.trainer.onboarding.title,
};

type TrainerRegisterPageProps = {
  searchParams: Promise<{ step?: string }>;
};

export default async function TrainerRegisterPage({
  searchParams,
}: TrainerRegisterPageProps) {
  const session = await auth();
  const params = await searchParams;
  const initialStep = params.step ? Number(params.step) : 1;

  if (session?.user?.role === USER_ROLE.CLIENT) {
    redirect(getRoleHome(USER_ROLE.CLIENT));
  }

  const draft = session?.user?.id
    ? await getTrainerOnboardingDraft(session.user.id)
    : {
        profileId: null,
        timezone: "" as const,
        photoUrl: null,
        bio: "",
        experienceYears: null,
        specializationSlugs: [],
        certificates: [],
        services: [],
        submittedAt: null,
        status: null,
      };

  if (draft.status === TRAINER_STATUS.APPROVED) {
    redirect("/trainer/dashboard");
  }

  if (draft.submittedAt) {
    redirect("/trainer/dashboard");
  }

  return (
    <div className="flex flex-1 flex-col py-4 md:py-8">
      <TrainerOnboardingWizard
        isAuthenticated={Boolean(session?.user?.id)}
        userRole={
          session?.user?.role === USER_ROLE.TRAINER ? USER_ROLE.TRAINER : null
        }
        draft={draft}
        initialStep={Number.isFinite(initialStep) ? initialStep : 1}
      />
    </div>
  );
}
