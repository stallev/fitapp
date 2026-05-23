import { CalendarCheckIcon, ShieldCheckIcon, StarIcon } from "lucide-react";

import { ContentText, Heading, SectionTitle } from "@/components/atoms";
import { PulseCard } from "@/components/ui/card";
import { MESSAGES } from "@/lib/messages";

const VALUE_PROP_ICONS = [ShieldCheckIcon, CalendarCheckIcon, StarIcon] as const;

export function LandingValueProps() {
  return (
    <section aria-labelledby="landing-value-props-heading" className="space-y-6">
      <SectionTitle as="h2" id="landing-value-props-heading">
        {MESSAGES.landing.valueProps.title}
      </SectionTitle>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {MESSAGES.landing.valueProps.items.map((item, index) => {
          const Icon = VALUE_PROP_ICONS[index] ?? ShieldCheckIcon;

          return (
            <PulseCard key={item.title} variant="base" className="space-y-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon aria-hidden className="size-5" />
              </span>
              <Heading as="h3" visualLevel="h5">
                {item.title}
              </Heading>
              <ContentText variant="muted" as="p">
                {item.description}
              </ContentText>
            </PulseCard>
          );
        })}
      </div>
    </section>
  );
}
