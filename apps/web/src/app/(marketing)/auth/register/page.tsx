import { Heading } from "@/components/atoms";
import { RegisterClientForm } from "@/components/auth/RegisterClientForm.client";
import { RegisterRoleTiles } from "@/components/auth/RegisterRoleTiles.server";
import { Container } from "@/components/ui/container";
import { getMessages } from "@/lib/messages/server";


export default async function RegisterPage() {
  const messages = await getMessages();
  return (
    <div className="flex flex-1 flex-col justify-center py-8">
      <Container variant="narrow" className="mx-auto w-full max-w-md px-4">
        <Heading as="h1" className="mb-6 text-center">
          {messages.auth.register.title}
        </Heading>
        <div className="space-y-6">
          <RegisterRoleTiles />
          <RegisterClientForm />
        </div>
      </Container>
    </div>
  );
}
