import { Suspense } from "react";

import { LoginPageContent } from "@/components/auth/LoginPageContent.server";
import { LoginPageSkeleton } from "@/components/auth/LoginPageSkeleton";
import { Container } from "@/components/ui/container";

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col justify-center py-8">
      <Container variant="narrow" className="mx-auto w-full max-w-md px-4">
        <Suspense fallback={<LoginPageSkeleton />}>
          <LoginPageContent />
        </Suspense>
      </Container>
    </div>
  );
}
