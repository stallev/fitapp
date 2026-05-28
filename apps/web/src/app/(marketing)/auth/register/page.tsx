import { Suspense } from "react";

import { RegisterPageContent } from "@/components/auth/RegisterPageContent.server";
import { RegisterPageSkeleton } from "@/components/auth/RegisterPageSkeleton";
import { Container } from "@/components/ui/container";

export default function RegisterPage() {
  return (
    <div className="flex flex-1 flex-col justify-center py-8">
      <Container variant="narrow" className="mx-auto w-full max-w-md px-4">
        <Suspense fallback={<RegisterPageSkeleton />}>
          <RegisterPageContent />
        </Suspense>
      </Container>
    </div>
  );
}
