import { TrainerCard } from "@/components/catalog/TrainerCard";
import { getFeaturedTrainers } from "@/data/catalog/get-featured-trainers.server";
import { getWishlistUiContext } from "@/data/wishlist/get-wishlist-ui-context.server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MESSAGES } from "@/lib/messages";

import { LandingFeaturedTrainersEmpty } from "./LandingFeaturedTrainersEmpty";
import { LandingFeaturedTrainersError } from "./LandingFeaturedTrainersError";

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

  const wishlistContext = await getWishlistUiContext(
    trainers.map((trainer) => trainer.id),
  );

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
        {trainers.map((trainer) => (
          <TrainerCard
            key={trainer.id}
            trainer={trainer}
            wishlist={{
              initialInWishlist: wishlistContext.wishlistedIds.has(trainer.id),
              isAuthenticated: wishlistContext.isAuthenticated,
              canToggle: wishlistContext.canToggle,
            }}
          />
        ))}
      </div>
    </section>
  );
}
