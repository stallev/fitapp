import { RoutePlaceholder } from "@/components/shell/RoutePlaceholder";
import { MESSAGES } from "@/lib/messages";

export default function BookConfirmPage() {
  return (
    <RoutePlaceholder
      title="Подтверждение"
      description={MESSAGES.placeholders.bookingConfirm}
    />
  );
}
