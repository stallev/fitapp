"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { ContentText } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MESSAGES } from "@/lib/messages";

type StrippedBookingHeaderProps = {
  step?: number;
  totalSteps?: number;
  backHref?: string;
};

export function StrippedBookingHeader({
  step = 1,
  totalSteps = 3,
  backHref,
}: StrippedBookingHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container variant="shell" className="flex h-14 items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={MESSAGES.shell.back}
          onClick={() => {
            if (backHref) {
              router.push(backHref);
              return;
            }
            router.back();
          }}
        >
          <ArrowLeftIcon aria-hidden className="size-4" />
        </Button>
        <ContentText variant="statusLabel" as="p" className="font-mono uppercase">
          {MESSAGES.shell.bookingStep
            .replace("{step}", String(step))
            .replace("{total}", String(totalSteps))}
        </ContentText>
      </Container>
    </header>
  );
}
