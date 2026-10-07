"use client";

import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { USER_ROLE } from "@pulse/domain";

import { WizardHeader } from "@/components/ui/WizardHeader";
import { Skeleton } from "@/components/ui/skeleton";
import type { TrainerOnboardingDraft } from "@/data/trainer/get-trainer-onboarding-draft.server";
import { useMessages } from "@/components/i18n/LocaleProvider.client";

function OnboardingStepFallback() {
  return (
    <div className="space-y-4" aria-busy="true">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-11 w-full rounded-full" />
    </div>
  );
}

const TrainerOnboardingCredentialsStep = dynamic(
  () =>
    import("@/components/trainer/onboarding/TrainerOnboardingCredentialsStep.client").then(
      (module) => ({ default: module.TrainerOnboardingCredentialsStep }),
    ),
  { loading: OnboardingStepFallback },
);

const TrainerOnboardingPersonalStep = dynamic(
  () =>
    import("@/components/trainer/onboarding/TrainerOnboardingPersonalStep.client").then(
      (module) => ({ default: module.TrainerOnboardingPersonalStep }),
    ),
  { loading: OnboardingStepFallback },
);

const TrainerOnboardingProfessionalStep = dynamic(
  () =>
    import("@/components/trainer/onboarding/TrainerOnboardingProfessionalStep.client").then(
      (module) => ({ default: module.TrainerOnboardingProfessionalStep }),
    ),
  { loading: OnboardingStepFallback },
);

const TrainerOnboardingCertificatesStep = dynamic(
  () =>
    import("@/components/trainer/onboarding/TrainerOnboardingCertificatesStep.client").then(
      (module) => ({ default: module.TrainerOnboardingCertificatesStep }),
    ),
  { loading: OnboardingStepFallback },
);

const TrainerOnboardingServicesStep = dynamic(
  () =>
    import("@/components/trainer/onboarding/TrainerOnboardingServicesStep.client").then(
      (module) => ({ default: module.TrainerOnboardingServicesStep }),
    ),
  { loading: OnboardingStepFallback },
);

const TrainerOnboardingPreviewStep = dynamic(
  () =>
    import("@/components/trainer/onboarding/TrainerOnboardingPreviewStep.client").then(
      (module) => ({ default: module.TrainerOnboardingPreviewStep }),
    ),
  { loading: OnboardingStepFallback },
);

const TOTAL_STEPS = 5;

export type TrainerOnboardingWizardProps = {
  isAuthenticated: boolean;
  userRole: typeof USER_ROLE.TRAINER | null;
  draft: TrainerOnboardingDraft;
  initialStep?: number;
};

function resolveInitialStep(
  isAuthenticated: boolean,
  draft: TrainerOnboardingDraft,
  initialStep: number,
): number {
  if (!isAuthenticated) {
    return 0;
  }

  if (draft.submittedAt) {
    return TOTAL_STEPS;
  }

  if (!draft.profileId) {
    return 1;
  }

  return Math.min(Math.max(initialStep, 1), TOTAL_STEPS);
}

export function TrainerOnboardingWizard({  isAuthenticated,
  userRole,
  draft,
  initialStep = 1,
}: TrainerOnboardingWizardProps) {
  const messages = useMessages();

  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(() =>
    resolveInitialStep(isAuthenticated, draft, initialStep),
  );

  useEffect(() => {
    if (step === 5) {
      router.refresh();
    }
  }, [step, router]);

  const stepLabel = useMemo(() => {
    switch (step) {
      case 1:
        return messages.trainer.onboarding.stepPersonal;
      case 2:
        return messages.trainer.onboarding.stepProfessional;
      case 3:
        return messages.trainer.onboarding.stepCertificates;
      case 4:
        return messages.trainer.onboarding.stepServices;
      case 5:
        return messages.trainer.onboarding.stepPreview;
      default:
        return messages.trainer.onboarding.credentialsTitle;
    }
  }, [step]);

  const syncUrl = useCallback(
    (nextStep: number) => {
      if (nextStep === 0) {
        router.replace("/auth/register/trainer", { scroll: false });
        return;
      }

      const params = new URLSearchParams(searchParams.toString());
      params.set("step", String(nextStep));
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const goToStep = useCallback(
    (nextStep: number) => {
      setStep(nextStep);
      syncUrl(nextStep);
    },
    [syncUrl],
  );

  if (userRole && userRole !== USER_ROLE.TRAINER) {
    return (
      <p className="text-center text-muted-foreground">
        {messages.trainer.onboarding.errors.forbidden}
      </p>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {step > 0 ? (
        <WizardHeader
          step={step}
          totalSteps={TOTAL_STEPS}
          stepLabel={stepLabel}
          stepCaption={messages.trainer.onboarding.stepOf
            .replace("{current}", String(step))
            .replace("{total}", String(TOTAL_STEPS))}
          backAriaLabel={messages.trainer.onboarding.back}
          onBack={() => goToStep(Math.max(step - 1, isAuthenticated ? 1 : 0))}
        />
      ) : null}

      <div className="px-4 py-6 md:px-0">
        {step === 0 ? (
          <TrainerOnboardingCredentialsStep
            onSuccess={() => {
              router.refresh();
              goToStep(1);
            }}
          />
        ) : null}
        {step === 1 ? (
          <TrainerOnboardingPersonalStep
            initialTimezone={draft.timezone}
            initialPhotoUrl={draft.photoUrl}
            onBack={() => goToStep(isAuthenticated ? 1 : 0)}
            onNext={() => goToStep(2)}
          />
        ) : null}
        {step === 2 ? (
          <TrainerOnboardingProfessionalStep
            initialBio={draft.bio}
            initialExperienceYears={draft.experienceYears}
            initialSpecializations={draft.specializationSlugs}
            onBack={() => goToStep(1)}
            onNext={() => goToStep(3)}
          />
        ) : null}
        {step === 3 ? (
          <TrainerOnboardingCertificatesStep
            initialCertificates={draft.certificates.map((certificate) => ({
              id: certificate.id,
              title: certificate.title,
              fileAssetId: certificate.fileAssetId ?? undefined,
            }))}
            onBack={() => goToStep(2)}
            onNext={() => goToStep(4)}
          />
        ) : null}
        {step === 4 ? (
          <TrainerOnboardingServicesStep
            initialServices={draft.services}
            onBack={() => goToStep(3)}
            onNext={() => goToStep(5)}
          />
        ) : null}
        {step === 5 ? (
          <TrainerOnboardingPreviewStep
            key={`preview-${draft.profileId ?? "new"}-${draft.certificates.length}-${draft.services.length}`}
            draft={draft}
            onBack={() => goToStep(4)}
          />
        ) : null}
      </div>
    </div>
  );
}
