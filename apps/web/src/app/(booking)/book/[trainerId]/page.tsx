import { RoutePlaceholder } from "@/components/shell/RoutePlaceholder";
import { MESSAGES } from "@/lib/messages";

type BookTrainerPageProps = {
  params: Promise<{ trainerId: string }>;
};

export default async function BookTrainerPage({ params }: BookTrainerPageProps) {
  await params;

  return (
    <RoutePlaceholder
      title="Бронирование"
      description={MESSAGES.placeholders.bookingWizard}
    />
  );
}
