import { Heading } from "@/components/atoms";
import { LoginDemoDivider } from "@/components/auth/LoginDemoDivider.server";
import { LoginPageFlow } from "@/components/auth/LoginPageFlow.client";
import { Container } from "@/components/ui/container";
import { isDemoRole } from "@/lib/demo/demo-credentials";
import { getMessages } from "@/lib/messages/server";

type LoginPageProps = {
  searchParams: Promise<{ callbackUrl?: string; demo?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const messages = await getMessages();
  const resolvedSearchParams = await searchParams;
  const callbackUrl = resolvedSearchParams.callbackUrl;
  const loadDemoPanel =
    isDemoRole(resolvedSearchParams.demo ?? null) ||
    process.env.NODE_ENV === "development";

  return (
    <div className="flex flex-1 flex-col justify-center py-8">
      <Container variant="narrow" className="mx-auto w-full max-w-2xl px-4">
        <Heading as="h1" className="mb-6 text-center">
          {messages.auth.login.title}
        </Heading>
        <LoginPageFlow callbackUrl={callbackUrl} loadDemoPanel={loadDemoPanel}>
          {loadDemoPanel ? <LoginDemoDivider /> : null}
        </LoginPageFlow>
      </Container>
    </div>
  );
}
