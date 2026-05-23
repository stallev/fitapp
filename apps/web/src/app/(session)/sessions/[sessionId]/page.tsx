import { RoutePlaceholder } from "@/components/shell/RoutePlaceholder";
import { MESSAGES } from "@/lib/messages";

export default function SessionPage() {
  return (
    <RoutePlaceholder
      title={MESSAGES.shell.sessionTitle}
      description={MESSAGES.placeholders.sessionVideo}
    />
  );
}
