import { ContentText, Heading } from "@/components/atoms";

import { MESSAGES } from "@/lib/messages";

export type ClientDashboardGreetingProps = {
  name: string;
};

export function ClientDashboardGreeting({ name }: ClientDashboardGreetingProps) {
  return (
    <div>
      <ContentText variant="mutedMicro" as="p">
        {MESSAGES.dashboard.client.greeting}
      </ContentText>
      <Heading as="h1" visualLevel="display" className="mt-1">
        {name}
      </Heading>
    </div>
  );
}
