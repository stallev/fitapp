import { ContentText, Heading } from "@/components/atoms";
import { PulseCard } from "@/components/ui/card";
import { MESSAGES } from "@/lib/messages";

export function TrainerReviewBanner() {
  return (
    <PulseCard variant="compact" state="warning" className="border-amber-200/60">
      <Heading as="h2" visualLevel="h6">
        {MESSAGES.trainerReviewBanner.title}
      </Heading>
      <ContentText variant="small" className="mt-1">
        {MESSAGES.trainerReviewBanner.description}
      </ContentText>
    </PulseCard>
  );
}
