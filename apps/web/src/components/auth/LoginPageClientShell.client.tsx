"use client";

import { Suspense } from "react";

import { ContentText } from "@/components/atoms";
import { LoginCredentialsProvider, useLoginCredentials } from "@/components/auth/LoginCredentialsProvider.client";
import { LoginDemoSection } from "@/components/auth/LoginDemoSection.client";
import { LoginForm } from "@/components/auth/LoginForm.client";
import { useMessages } from "@/components/i18n/LocaleProvider.client";
import { Skeleton } from "@/components/ui/skeleton";

function LoginDemoFallback() {
  return (
    <div className="space-y-4" aria-busy="true">
      <Skeleton className="mx-auto h-4 w-48" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Skeleton className="h-40 w-full rounded-[var(--card-radius-lg)]" />
        <Skeleton className="h-40 w-full rounded-[var(--card-radius-lg)]" />
        <Skeleton className="h-40 w-full rounded-[var(--card-radius-lg)]" />
      </div>
    </div>
  );
}

type LoginPageClientShellProps = {
  callbackUrl?: string;
};

function LoginPageClientShellInner({
  callbackUrl,
}: LoginPageClientShellProps) {
  const messages = useMessages();
  const { demoRole, credentials } = useLoginCredentials();

  return (
    <div className="space-y-0">
      <Suspense fallback={<LoginDemoFallback />}>
        <LoginDemoSection />
      </Suspense>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <ContentText
            as="span"
            variant="subtle"
            className="bg-background px-3 text-xs uppercase tracking-wide"
          >
            {messages.auth.demo.dividerLabel}
          </ContentText>
        </div>
      </div>

      <LoginForm
        key={demoRole ?? "manual"}
        callbackUrl={callbackUrl}
        initialEmail={credentials?.email}
        initialPassword={credentials?.password}
      />
    </div>
  );
}

export function LoginPageClientShell({
  callbackUrl,
}: LoginPageClientShellProps) {
  return (
    <LoginCredentialsProvider>
      <LoginPageClientShellInner callbackUrl={callbackUrl} />
    </LoginCredentialsProvider>
  );
}
