import { ContentText, Heading } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { CustomLink } from "@/components/ui/CustomLink";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { MetaRow } from "@/components/ui/MetaRow";
import { ClockIcon } from "lucide-react";

import type { TrainerServiceItem } from "@/lib/trainer/trainer-profile";
import { formatBookingPrice } from "@/lib/booking/booking-wizard-utils";
import { MESSAGES } from "@/lib/messages";

export type BookingWizardServiceStepProps = {
  services: TrainerServiceItem[];
  selectedServiceId: string | null;
  trainerProfileId: string;
  onSelect: (serviceId: string) => void;
};

export function BookingWizardServiceStep({
  services,
  selectedServiceId,
  trainerProfileId,
  onSelect,
}: BookingWizardServiceStepProps) {
  if (services.length === 0) {
    return (
      <div className="space-y-4 py-8 text-center">
        <Heading as="h2" visualLevel="h3">
          {MESSAGES.booking.wizard.noServicesTitle}
        </Heading>
        <ContentText variant="muted" as="p">
          {MESSAGES.booking.wizard.noServicesDescription}
        </ContentText>
        <Button asChild variant="outline">
          <CustomLink href={`/trainers/${trainerProfileId}`}>
            {MESSAGES.booking.wizard.noServicesCta}
          </CustomLink>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {services.map((service) => (
        <ChoiceCard
          key={service.id}
          selected={selectedServiceId === service.id}
          title={service.name}
          meta={
            <MetaRow icon={<ClockIcon className="size-3" aria-hidden />}>
              {service.durationMinutes} мин
            </MetaRow>
          }
          trailing={formatBookingPrice(service.priceCents, service.currency)}
          onClick={() => onSelect(service.id)}
        />
      ))}
    </div>
  );
}
