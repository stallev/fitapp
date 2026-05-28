import { Suspense } from "react";

import { Heading } from "@/components/atoms";
import { LoginForm } from "@/components/auth/LoginForm.client";
import { LoginFormFallback } from "@/components/auth/LoginFormFallback";
import { getMessages } from "@/lib/messages/server";

export async function LoginPageContent() {
  const messages = await getMessages();

  return (
    <>
      <Heading as="h1" className="mb-6 text-center">
        {messages.auth.login.title}
      </Heading>
      <Suspense fallback={<LoginFormFallback />}>
        <LoginForm />
      </Suspense>
    </>
  );
}
