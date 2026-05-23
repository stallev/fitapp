"use client";

import { Loader2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import {
  SPECIALIZATION_SLUGS,
  type SpecializationSlug,
} from "@pulse/domain";

import { saveOnboardingStep2Action } from "@/actions/trainer/save-onboarding-step-2";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SpecChip } from "@/components/ui/SpecChip";
import { Textarea } from "@/components/ui/textarea";
import { MESSAGES } from "@/lib/messages";
import { PRODUCT_TOAST_DURATION_MS } from "@/lib/ui/product-toast";
import { cn } from "@/lib/utils";

const SPEC_LABELS: Record<SpecializationSlug, string> = {
  yoga: "Yoga",
  pilates: "Pilates",
  strength: "Strength",
  hiit: "HIIT",
  stretching: "Stretching",
};

export type TrainerOnboardingProfessionalStepProps = {
  initialBio: string;
  initialExperienceYears: number | null;
  initialSpecializations: string[];
  onBack: () => void;
  onNext: () => void;
};

export function TrainerOnboardingProfessionalStep({
  initialBio,
  initialExperienceYears,
  initialSpecializations,
  onBack,
  onNext,
}: TrainerOnboardingProfessionalStepProps) {
  const [bio, setBio] = useState(initialBio);
  const [experienceYears, setExperienceYears] = useState(
    initialExperienceYears?.toString() ?? "",
  );
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>(initialSpecializations);
  const [isPending, startTransition] = useTransition();

  const toggleSpec = (slug: SpecializationSlug) => {
    setSelectedSpecs((current) =>
      current.includes(slug)
        ? current.filter((entry) => entry !== slug)
        : [...current, slug],
    );
  };

  const handleNext = () => {
    startTransition(async () => {
      const result = await saveOnboardingStep2Action({
        bio: bio.trim() || undefined,
        specializationSlugs: selectedSpecs as SpecializationSlug[],
        experienceYears: experienceYears ? Number(experienceYears) : undefined,
      });

      if (!result?.ok) {
        toast.error(result?.message ?? MESSAGES.trainer.onboarding.errors.generic, {
          duration: PRODUCT_TOAST_DURATION_MS,
        });
        return;
      }

      onNext();
    });
  };

  return (
    <div className="space-y-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="bio">{MESSAGES.trainer.onboarding.bioLabel}</FieldLabel>
          <Textarea
            id="bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            disabled={isPending}
            rows={5}
          />
        </Field>
        <Field>
          <FieldLabel>{MESSAGES.trainer.onboarding.specializationsLabel}</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {SPECIALIZATION_SLUGS.map((slug) => {
              const selected = selectedSpecs.includes(slug);
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => toggleSpec(slug)}
                  disabled={isPending}
                  className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <SpecChip
                    className={cn(
                      selected && "bg-primary-container text-primary",
                    )}
                  >
                    {SPEC_LABELS[slug]}
                  </SpecChip>
                </button>
              );
            })}
          </div>
        </Field>
        <Field>
          <FieldLabel htmlFor="experience">
            {MESSAGES.trainer.onboarding.experienceLabel}
          </FieldLabel>
          <Input
            id="experience"
            type="number"
            min={0}
            max={60}
            value={experienceYears}
            onChange={(event) => setExperienceYears(event.target.value)}
            disabled={isPending}
          />
        </Field>
      </FieldGroup>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} disabled={isPending}>
          {MESSAGES.trainer.onboarding.back}
        </Button>
        <Button type="button" className="flex-1" onClick={handleNext} disabled={isPending} aria-busy={isPending}>
          {isPending ? (
            <>
              <Loader2Icon aria-hidden className="size-4 animate-spin" />
              {MESSAGES.trainer.onboarding.nextSaving}
            </>
          ) : (
            MESSAGES.trainer.onboarding.next
          )}
        </Button>
      </div>
    </div>
  );
}
