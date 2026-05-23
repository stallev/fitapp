import { TrainerCard } from "@/components/catalog/TrainerCard";
import { getFeaturedTrainers } from "@/data/catalog/get-featured-trainers.server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MESSAGES } from "@/lib/messages";

import { LandingFeaturedTrainersEmpty } from "./LandingFeaturedTrainersEmpty";
import { LandingFeaturedTrainersError } from "./LandingFeaturedTrainersError";

const ABOVE_FOLD_IMAGE_COUNT = 3;

export async function LandingFeaturedTrainers() {
  let trainers;

  try {
    trainers = await getFeaturedTrainers();
  } catch {
    return <LandingFeaturedTrainersError />;
  }

  if (trainers.length === 0) {
    return <LandingFeaturedTrainersEmpty />;
  }

  return (
    <section aria-labelledby="landing-featured-heading" className="space-y-4">
      <SectionHeader
        title={
          <span id="landing-featured-heading">{MESSAGES.landing.featured.title}</span>
        }
        actionHref="/trainers"
        actionLabel={MESSAGES.landing.featured.actionLabel}
      />
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 no-scrollbar md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0">
        {trainers.map((trainer, index) => (
          <TrainerCard
            key={trainer.id}
            trainer={trainer}
            imagePriority={index < ABOVE_FOLD_IMAGE_COUNT}
          />
        ))}
      </div>
    </section>
  );
}
