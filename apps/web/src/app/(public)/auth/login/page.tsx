import { Suspense } from "react";

import { Heading } from "@/components/atoms";
import { LoginForm } from "@/components/auth/LoginForm.client";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { MESSAGES } from "@/lib/messages";

function LoginFormFallback() {
  return (
    <div className="space-y-4" aria-busy="true">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-11 w-full rounded-full" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh flex-col justify-center py-8">
      <Container variant="narrow" className="mx-auto w-full max-w-md px-4">
        <Heading as="h1" className="mb-6 text-center">
          {MESSAGES.auth.login.title}
        </Heading>
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </Container>
    </main>
  );
}
