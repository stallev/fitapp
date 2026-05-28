import { Heading } from "@/components/atoms";
import { RegisterClientForm } from "@/components/auth/RegisterClientForm.client";
import { getMessages } from "@/lib/messages/server";

export async function RegisterPageContent() {
  const messages = await getMessages();

  return (
    <>
      <Heading as="h1" className="mb-6 text-center">
        {messages.auth.register.title}
      </Heading>
      <RegisterClientForm />
    </>
  );
}
