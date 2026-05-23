import { Heading } from "@/components/atoms";
import { Container } from "@/components/ui/container";
import { RegisterClientForm } from "@/components/auth/RegisterClientForm.client";
import { MESSAGES } from "@/lib/messages";

export default function RegisterPage() {
  return (
    <div className="flex flex-1 flex-col justify-center py-8">
      <Container variant="narrow" className="mx-auto w-full max-w-md px-4">
        <Heading as="h1" className="mb-6 text-center">
          {MESSAGES.auth.register.title}
        </Heading>
        <RegisterClientForm />
      </Container>
    </div>
  );
}
