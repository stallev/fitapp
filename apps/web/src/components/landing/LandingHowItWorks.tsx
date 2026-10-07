import { CalendarIcon, SearchIcon, UsersIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import { MarketingSectionHeader } from "@/components/ui/MarketingSectionHeader";
import { StepCard } from "@/components/ui/StepCard";
import { getMessages } from "@/lib/messages/server";


const STEP_ICONS = [SearchIcon, UsersIcon, CalendarIcon] as const;

export async function LandingHowItWorks() {
  const messages = await getMessages();
  const { howItWorks } = messages.landing;

  return (
    <section id="how" className="bg-card py-24">
      <Container variant="marketing">
        <MarketingSectionHeader
          label={howItWorks.label}
          title={howItWorks.title}
          subtitle={howItWorks.subtitle}
        />
        <div className="grid items-stretch gap-7 md:grid-cols-3">
          {howItWorks.steps.map((step, index) => (
            <div key={step.step} className="h-full">
              <StepCard
                step={step.step}
                icon={STEP_ICONS[index] ?? SearchIcon}
                title={step.title}
                description={step.description}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
