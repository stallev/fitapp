"use client";

import { Loader2Icon, PlusIcon, XIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { FILE_UPLOAD_PURPOSE, type OnboardingCertificateRow } from "@pulse/domain";

import { saveOnboardingStep3Action } from "@/actions/trainer/save-onboarding-step-3";
import { Button } from "@/components/ui/button";
import { FileUploadZone } from "@/components/ui/FileUploadZone.client";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MESSAGES } from "@/lib/messages";
import { PRODUCT_TOAST_DURATION_MS } from "@/lib/ui/product-toast";

export type TrainerOnboardingCertificatesStepProps = {
  initialCertificates: OnboardingCertificateRow[];
  onBack: () => void;
  onNext: () => void;
};

function emptyCertificate(): OnboardingCertificateRow {
  return { title: "", fileAssetId: undefined };
}

export function TrainerOnboardingCertificatesStep({
  initialCertificates,
  onBack,
  onNext,
}: TrainerOnboardingCertificatesStepProps) {
  const [rows, setRows] = useState<OnboardingCertificateRow[]>(
    initialCertificates.length > 0 ? initialCertificates : [emptyCertificate()],
  );
  const [isPending, startTransition] = useTransition();

  const updateRow = (index: number, patch: Partial<OnboardingCertificateRow>) => {
    setRows((current) =>
      current.map((row, rowIndex) =>
        rowIndex === index ? { ...row, ...patch } : row,
      ),
    );
  };

  const handleNext = () => {
    startTransition(async () => {
      const certificates = rows.filter((row) => row.title.trim().length > 0);
      const result = await saveOnboardingStep3Action({ certificates });

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
      <div className="space-y-4">
        {rows.map((row, index) => (
          <div key={index} className="space-y-3 rounded-2xl border border-border p-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor={`cert-title-${index}`}>
                  {MESSAGES.trainer.onboarding.certificateTitleLabel}
                </FieldLabel>
                <Input
                  id={`cert-title-${index}`}
                  value={row.title}
                  onChange={(event) => updateRow(index, { title: event.target.value })}
                  disabled={isPending}
                />
              </Field>
            </FieldGroup>
            <FileUploadZone
              purpose={FILE_UPLOAD_PURPOSE.CERTIFICATE}
              accept="image/jpeg,image/png,image/webp,application/pdf"
              label={MESSAGES.trainer.onboarding.certificateUpload}
              disabled={isPending}
              onUploaded={({ fileAssetId }) => updateRow(index, { fileAssetId })}
            />
            {rows.length > 1 ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setRows((current) => current.filter((_, i) => i !== index))}
                disabled={isPending}
              >
                <XIcon aria-hidden className="size-4" />
                Remove
              </Button>
            ) : null}
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => setRows((current) => [...current, emptyCertificate()])}
        disabled={isPending}
      >
        <PlusIcon aria-hidden className="size-4" />
        {MESSAGES.trainer.onboarding.addCertificate}
      </Button>

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
