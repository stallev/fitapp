import { ContentText, Heading } from "@/components/atoms";
import { Container } from "@/components/ui/container";
import { MESSAGES } from "@/lib/messages";

export default function ClientDashboardPage() {
  return (
    <main>
      <Container variant="page">
        <Heading as="h1">Dashboard</Heading>
        <ContentText className="mt-4">{MESSAGES.dashboard.clientStub}</ContentText>
      </Container>
    </main>
  );
}
