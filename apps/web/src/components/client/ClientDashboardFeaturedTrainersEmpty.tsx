import { ContentText } from "@/components/atoms";
import { CustomLink } from "@/components/ui/CustomLink";
import { SectionHeader } from "@/components/ui/SectionHeader";

import { MESSAGES } from "@/lib/messages";

export function ClientDashboardFeaturedTrainersEmpty() {
  return (
    <section>
      <SectionHeader
        title={MESSAGES.dashboard.client.topTrainersTitle}
        actionHref="/trainers"
        actionLabel={MESSAGES.dashboard.client.topTrainersAll}
      />
      <ContentText variant="muted" as="p">
        {MESSAGES.dashboard.client.topTrainersEmpty}
      </ContentText>
      <CustomLink href="/trainers" className="mt-3 inline-flex">
        {MESSAGES.dashboard.client.nextSessionCta}
      </CustomLink>
    </section>
  );
}
