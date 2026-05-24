"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import { ContentText } from "@/components/atoms";
import { Textarea } from "@/components/ui/textarea";
import { MESSAGES } from "@/lib/messages";
import { PRODUCT_TOAST_DURATION_MS } from "@/lib/ui/product-toast";
import { resilientPostFetch } from "@/lib/ui/resilient-post-fetch";

export type TrainerClientNotesFieldProps = {
  clientId: string;
  initialNotes: string;
};

export function TrainerClientNotesField({
  clientId,
  initialNotes,
}: TrainerClientNotesFieldProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  function saveNotes(nextNotes: string) {
    startTransition(async () => {
      try {
        const response = await resilientPostFetch(
          `/api/trainer/clients/${clientId}/notes`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ notes: nextNotes }),
          },
        );
        const result = (await response.json()) as { ok: boolean; message?: string };

        if (!response.ok || !result.ok) {
          toast.error(result.message ?? MESSAGES.trainer.clients.errors.notesSave, {
            duration: PRODUCT_TOAST_DURATION_MS,
          });
        }
      } catch {
        toast.error(MESSAGES.trainer.clients.errors.notesSave, {
          duration: PRODUCT_TOAST_DURATION_MS,
        });
      }
    });
  }

  function handleChange(value: string) {
    setNotes(value);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      saveNotes(value);
    }, 1000);
  }

  return (
    <div className="space-y-2">
      <Textarea
        value={notes}
        onChange={(event) => handleChange(event.target.value)}
        rows={5}
        aria-busy={isPending}
        disabled={isPending}
        placeholder={MESSAGES.trainer.clients.privateNotesHint}
      />
      <ContentText variant="hint" as="p">
        {isPending
          ? MESSAGES.trainer.clients.notesSaving
          : MESSAGES.trainer.clients.notesSaved}
      </ContentText>
    </div>
  );
}
