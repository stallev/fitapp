import { SectionTitle } from "@/components/atoms";
import { PulseCard, PulseCardContent } from "@/components/ui/card";
import { formatMoney } from "@/lib/format-money";
import { MESSAGES } from "@/lib/messages";

export type TrainerApplicationService = {
  name: string;
  durationMinutes: number;
  priceCents: number;
};

export type TrainerApplicationServicesSectionProps = {
  services: TrainerApplicationService[];
};

export function TrainerApplicationServicesSection({
  services,
}: TrainerApplicationServicesSectionProps) {
  return (
    <section className="space-y-3">
      <SectionTitle>{MESSAGES.admin.moderation.services}</SectionTitle>

      <PulseCard variant="compact" className="rounded-2xl md:max-w-xl ring-1 ring-border">
        <PulseCardContent density="sm">
          <ul className="divide-y divide-border">
            {services.map((service) => (
              <li
                key={`${service.name}-${service.durationMinutes}`}
                className="flex flex-wrap items-baseline justify-between gap-2 py-2 first:pt-0 last:pb-0"
              >
                <span className="font-medium">{service.name}</span>
                <span className="text-sm text-muted-foreground">
                  {service.durationMinutes} min · {formatMoney(service.priceCents)}
                </span>
              </li>
            ))}
          </ul>
        </PulseCardContent>
      </PulseCard>
    </section>
  );
}
