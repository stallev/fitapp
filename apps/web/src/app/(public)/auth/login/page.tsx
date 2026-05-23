import { Heading } from "@/components/atoms";
import { Container } from "@/components/ui/container";
import { LoginForm } from "@/components/auth/LoginForm.client";
import { MESSAGES } from "@/lib/messages";

type LoginPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl;

  return (
    <main className="flex min-h-dvh flex-col justify-center py-8">
      <Container variant="narrow" className="mx-auto w-full max-w-md px-4">
        <Heading as="h1" className="mb-6 text-center">
          {MESSAGES.auth.login.title}
        </Heading>
        <LoginForm callbackUrl={callbackUrl} />
      </Container>
    </main>
  );
}
