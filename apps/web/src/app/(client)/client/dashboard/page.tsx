import Link from "next/link";
import { CalendarIcon } from "lucide-react";

import { Heading } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { MESSAGES } from "@/lib/messages";

export default function ClientDashboardPage() {
  return (
    <>
      <Heading as="h1" visualLevel="h3">
        {MESSAGES.dashboard.clientTitle}
      </Heading>
      <Empty className="mt-6 border-border bg-card">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CalendarIcon aria-hidden />
          </EmptyMedia>
          <EmptyTitle>{MESSAGES.empty.clientDashboard.title}</EmptyTitle>
          <EmptyDescription>
            {MESSAGES.empty.clientDashboard.description}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href="/trainers">{MESSAGES.empty.clientDashboard.cta}</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </>
  );
}
