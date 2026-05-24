"use client";

import { Container } from "@/components/ui/container";
import { MarketingAccordion } from "@/components/ui/MarketingAccordion.client";
import { MarketingSectionHeader } from "@/components/ui/MarketingSectionHeader";
import { MESSAGES } from "@/lib/messages";

export function LandingFaq() {
  const { faq } = MESSAGES.landing;

  return (
    <section id="faq" className="bg-card py-24">
      <Container variant="marketing">
        <MarketingSectionHeader label={faq.label} title={faq.title} animate />
        <MarketingAccordion items={[...faq.items]} />
      </Container>
    </section>
  );
}
