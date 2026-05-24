import Link from "next/link";

import { ContentText, Heading } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MESSAGES } from "@/lib/messages";

export default function NotFoundPage() {
  return (
    <main
      id="main-content"
      className="flex min-h-dvh flex-col items-center justify-center px-4 py-16"
    >
      <Container variant="narrow" className="text-center">
        <Heading as="h1" visualLevel="h2">
          {MESSAGES.notFound.title}
        </Heading>
        <ContentText variant="bodyMuted" className="mt-3">
          {MESSAGES.notFound.description}
        </ContentText>
        <Button asChild className="mt-6">
          <Link href="/">{MESSAGES.notFound.homeCta}</Link>
        </Button>
      </Container>
    </main>
  );
}
