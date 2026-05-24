import { ContentText, Heading } from "@/components/atoms";
import { PulseCard } from "@/components/ui/card";
import type { PublicTrainerProfile } from "@/lib/trainer/trainer-profile";
import { formatServicePrice } from "@/lib/trainer/format-service-price";

export type TrainerProfileServicesTabProps = {
  profile: PublicTrainerProfile;
};

export function TrainerProfileServicesTab({
  profile,
}: TrainerProfileServicesTabProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {profile.services.map((service) => (
        <PulseCard key={service.id} className="p-4 md:p-5">
          <Heading as="h3" visualLevel="h4">
            {service.name}
          </Heading>
          {service.description ? (
            <ContentText variant="muted" as="p" className="mt-1">
              {service.description}
            </ContentText>
          ) : null}
          <div className="mt-3 flex items-center justify-between gap-3">
            <ContentText variant="mutedMicro" as="span">
              {service.durationMinutes} мин
            </ContentText>
            <ContentText variant="smallEmphasis" as="span" className="font-heading">
              {formatServicePrice(service.priceCents, service.currency)}
            </ContentText>
          </div>
        </PulseCard>
      ))}
    </div>
  );
}
