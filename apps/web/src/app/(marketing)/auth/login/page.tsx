import { Heading } from "@/components/atoms";
import { LoginPageClientShell } from "@/components/auth/LoginPageClientShell.client";
import { Container } from "@/components/ui/container";
import { getMessages } from "@/lib/messages/server";

type LoginPageProps = {
  searchParams: Promise<{ callbackUrl?: string; demo?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const messages = await getMessages();
  const resolvedSearchParams = await searchParams;
  const callbackUrl = resolvedSearchParams.callbackUrl;

  return (
    <div className="flex flex-1 flex-col justify-center py-8">
      <Container variant="narrow" className="mx-auto w-full max-w-2xl px-4">
        <Heading as="h1" className="mb-6 text-center">
          {messages.auth.login.title}
        </Heading>
        <LoginPageClientShell callbackUrl={callbackUrl} />
      </Container>
    </div>
  );
}
