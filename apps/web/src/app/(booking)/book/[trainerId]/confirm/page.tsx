import { RoutePlaceholder } from "@/components/shell/RoutePlaceholder";
import { MESSAGES } from "@/lib/messages";

type BookConfirmPageProps = {
  params: Promise<{ trainerId: string }>;
};

export default async function BookConfirmPage({
  params,
}: BookConfirmPageProps) {
  await params;

  return (
    <RoutePlaceholder
      title="Подтверждение"
      description={MESSAGES.placeholders.bookingConfirm}
    />
  );
}
