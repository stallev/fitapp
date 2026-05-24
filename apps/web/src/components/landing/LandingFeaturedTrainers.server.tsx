import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { FeaturedTrainerCard } from "@/components/catalog/FeaturedTrainerCard";
import { getFeaturedTrainers } from "@/data/catalog/get-featured-trainers.server";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MarketingSectionHeader } from "@/components/ui/MarketingSectionHeader";
import { Reveal } from "@/components/ui/Reveal.client";
import { MESSAGES } from "@/lib/messages";

import { LandingFeaturedTrainersEmpty } from "./LandingFeaturedTrainersEmpty";
import { LandingFeaturedTrainersError } from "./LandingFeaturedTrainersError";

export async function LandingFeaturedTrainers() {
  const { featured } = MESSAGES.landing;

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
        <MarketingSectionHeader
          label={featured.label}
          title={featured.title}
          subtitle={featured.subtitle}
          animate
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trainers.slice(0, 3).map((trainer, index) => (
            <Reveal key={trainer.id} delay={`${(index + 1) * 100}ms`}>
              <FeaturedTrainerCard trainer={trainer} imagePriority={index === 0} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link href="/trainers">
              {featured.browseAll}
              <ArrowRightIcon aria-hidden className="size-[18px]" />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
