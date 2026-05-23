import { ContentText, Heading } from "@/components/atoms";
import { Container } from "@/components/ui/container";
import { MESSAGES } from "@/lib/messages";

export default function TrainerDashboardPage() {
  return (
    <main>
      <Container variant="page">
        <Heading as="h1">Dashboard</Heading>
        <ContentText className="mt-4">{MESSAGES.dashboard.trainerStub}</ContentText>
      </Container>
    </main>
  );
}
