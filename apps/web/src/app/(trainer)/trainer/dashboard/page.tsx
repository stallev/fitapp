import Link from "next/link";
import { CalendarIcon } from "lucide-react";
import { Suspense } from "react";

import { Heading } from "@/components/atoms";
import { TrainerDashboardSubmittedToast } from "@/components/trainer/TrainerDashboardSubmittedToast.client";
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

export default function TrainerDashboardPage() {
  return (
    <>
      <Suspense fallback={null}>
        <TrainerDashboardSubmittedToast />
      </Suspense>
      <Heading as="h1" visualLevel="h3">
        {MESSAGES.dashboard.trainerTitle}
      </Heading>
      <Empty className="mt-6 border-border bg-card">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CalendarIcon aria-hidden />
          </EmptyMedia>
          <EmptyTitle>{MESSAGES.empty.trainerDashboard.title}</EmptyTitle>
          <EmptyDescription>
            {MESSAGES.empty.trainerDashboard.description}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href="/trainer/profile">
              {MESSAGES.empty.trainerDashboard.cta}
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    </>
  );
}
