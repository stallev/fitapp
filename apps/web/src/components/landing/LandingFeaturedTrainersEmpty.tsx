import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { MarketingSectionHeader } from "@/components/ui/MarketingSectionHeader";
import { MESSAGES } from "@/lib/messages";

export function LandingFeaturedTrainersEmpty() {
  const { featured } = MESSAGES.landing;

  return (
    <section id="trainers" className="bg-card py-24">
      <Container variant="marketing">
        <MarketingSectionHeader
          label={featured.label}
          title={featured.title}
          subtitle={featured.subtitle}
        />
        <Empty className="border-border bg-background">
          <EmptyHeader>
            <EmptyTitle>{featured.empty.title}</EmptyTitle>
            <EmptyDescription>{featured.empty.description}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild variant="outline">
              <Link href="/trainers">{featured.empty.cta}</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </Container>
    </section>
  );
}
