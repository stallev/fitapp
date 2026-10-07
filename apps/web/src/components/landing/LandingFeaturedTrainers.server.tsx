import { ContentText, SectionEyebrow, SectionTitle } from "@/components/atoms";
import { FeaturedTrainerCard } from "@/components/catalog/FeaturedTrainerCard";
import { getFeaturedTrainers } from "@/data/catalog/get-featured-trainers.server";
import { Container } from "@/components/ui/container";
import { getMessages } from "@/lib/messages/server";

import { LandingFeaturedTrainersBrowseCta } from "./LandingFeaturedTrainersBrowseCta.server";
import { LandingFeaturedTrainersEmpty } from "./LandingFeaturedTrainersEmpty";
import { LandingFeaturedTrainersError } from "./LandingFeaturedTrainersError";

export async function LandingFeaturedTrainers() {
  const messages = await getMessages();
  const { featured } = messages.landing;

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
    <section id="trainers" className="bg-card py-24">
      <Container variant="marketing">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <SectionEyebrow tone="default" className="mb-5">
            {featured.label}
          </SectionEyebrow>
          <SectionTitle
            as="h2"
            className="mb-3.5 text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.05] tracking-tight"
          >
            {featured.title}
          </SectionTitle>
          <ContentText variant="lead" as="p" className="mx-auto max-w-[540px] leading-relaxed">
            {featured.subtitle}
          </ContentText>
        </div>
        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trainers.slice(0, 3).map((trainer) => (
            <div key={trainer.id} className="h-full">
              <FeaturedTrainerCard trainer={trainer} />
            </div>
          ))}
        </div>
        <LandingFeaturedTrainersBrowseCta label={featured.browseAll} />
      </Container>
    </section>
  );
}
