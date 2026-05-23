import { RoutePlaceholder } from "@/components/shell/RoutePlaceholder";
import { MESSAGES } from "@/lib/messages";

export default function BookTrainerPage() {
  return (
    <RoutePlaceholder
      title="Бронирование"
      description={MESSAGES.placeholders.bookingWizard}
    />
  );
}
