import { Alert, AlertTitle } from "@/components/ui/alert";
import { MESSAGES } from "@/lib/messages";

export function TrainerApplicationIncompleteAlert() {
  return (
    <Alert variant="destructive">
      <AlertTitle>{MESSAGES.admin.moderation.incomplete}</AlertTitle>
    </Alert>
  );
}
