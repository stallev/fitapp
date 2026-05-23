import { RoutePlaceholder } from "@/components/shell/RoutePlaceholder";
import { MESSAGES } from "@/lib/messages";

type SessionPageProps = {
  params: Promise<{ sessionId: string }>;
};

export default async function SessionPage({ params }: SessionPageProps) {
  await params;

  return (
    <RoutePlaceholder
      title={MESSAGES.shell.sessionTitle}
      description={MESSAGES.placeholders.sessionVideo}
    />
  );
}
