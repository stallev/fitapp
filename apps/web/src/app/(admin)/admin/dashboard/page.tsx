import { ContentText, Heading } from "@/components/atoms";
import { Container } from "@/components/ui/container";
import { MESSAGES } from "@/lib/messages";

export default function AdminDashboardPage() {
  return (
    <main>
      <Container variant="page">
        <Heading as="h1">Admin</Heading>
        <ContentText className="mt-4">{MESSAGES.dashboard.adminStub}</ContentText>
      </Container>
    </main>
  );
}
