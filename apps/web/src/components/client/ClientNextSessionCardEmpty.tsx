import { CalendarIcon } from "lucide-react";

import { CustomLink } from "@/components/ui/CustomLink";
import { PulseCard } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { MESSAGES } from "@/lib/messages";

export function ClientNextSessionCardEmpty() {
  return (
    <section>
      <SectionHeader title={MESSAGES.dashboard.client.nextSessionTitle} />
      <PulseCard className="overflow-hidden p-6 md:p-8">
        <Empty className="border-0 bg-transparent p-0">
          <EmptyHeader>
            <EmptyMedia variant="default">
              <CalendarIcon className="size-12 stroke-[1.2] text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle className="font-heading text-[22px] font-normal">
              {MESSAGES.dashboard.client.nextSessionEmptyTitle}
            </EmptyTitle>
            <EmptyDescription>
              {MESSAGES.dashboard.client.nextSessionEmptyDescription}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <CustomLink as="button" href="/trainers" className="min-h-11 w-full sm:w-auto">
              {MESSAGES.dashboard.client.nextSessionCta}
            </CustomLink>
          </EmptyContent>
        </Empty>
      </PulseCard>
    </section>
  );
}
