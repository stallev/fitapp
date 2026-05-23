"use client";

import { Loader2Icon, UploadIcon } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { upload } from "@vercel/blob/client";

import { initiateUploadAction } from "@/actions/file-upload/initiate-upload";
import { ContentText } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { type FileUploadPurpose } from "@pulse/domain";
import { MESSAGES } from "@/lib/messages";
import { PRODUCT_TOAST_DURATION_MS } from "@/lib/ui/product-toast";
import { cn } from "@/lib/utils";

export type FileUploadZoneProps = {
  purpose: FileUploadPurpose;
  accept: string;
  label: string;
  disabled?: boolean;
  onUploaded: (payload: { fileAssetId: string; blobUrl: string }) => void;
  className?: string;
};

export function FileUploadZone({
  purpose,
  accept,
  label,
  disabled = false,
  onUploaded,
  className,
}: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSelect = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }

    startTransition(async () => {
      const initiateResult = await initiateUploadAction({
        purpose,
        mimeType: file.type,
        sizeBytes: file.size,
      });

      if (!initiateResult.ok) {
        toast.error(initiateResult.message ?? MESSAGES.fileUpload.errors.generic, {
          duration: PRODUCT_TOAST_DURATION_MS,
        });
        return;
      }

      try {
        const blob = await upload(initiateResult.data.pathname, file, {
          access: purpose === "verification_doc" ? "private" : "public",
          handleUploadUrl: "/api/upload",
          clientPayload: JSON.stringify({
            purpose,
            mimeType: file.type,
            sizeBytes: file.size,
          }),
        });

        setFileName(file.name);
        onUploaded({
          fileAssetId: initiateResult.data.fileAssetId,
          blobUrl: blob.url,
        });
      } catch {
        toast.error(MESSAGES.fileUpload.errors.generic, {
          duration: PRODUCT_TOAST_DURATION_MS,
        });
      }
    });
  };

  const pending = isPending || disabled;

  return (
    <div className={cn("space-y-2", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={handleChange}
        disabled={pending}
        aria-hidden
        tabIndex={-1}
      />
      <Button
        type="button"
        variant="outline"
        className="w-full justify-start gap-2"
        onClick={handleSelect}
        disabled={pending}
        aria-busy={isPending}
      >
        {isPending ? (
          <Loader2Icon aria-hidden className="size-4 animate-spin" />
        ) : (
          <UploadIcon aria-hidden className="size-4" />
        )}
        {isPending
          ? MESSAGES.fileUpload.uploading
          : fileName ?? label}
      </Button>
      {fileName ? (
        <ContentText variant="mutedMicro" as="p">
          {MESSAGES.fileUpload.uploaded}: {fileName}
        </ContentText>
      ) : null}
    </div>
  );
}
