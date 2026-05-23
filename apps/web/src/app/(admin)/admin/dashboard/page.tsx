import Link from "next/link";
import { ShieldIcon } from "lucide-react";

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

export default function AdminDashboardPage() {
  return (
    <>
      <Heading as="h1" visualLevel="h3">
        {MESSAGES.dashboard.adminTitle}
      </Heading>
      <Empty className="mt-6 border-border bg-card">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShieldIcon aria-hidden />
          </EmptyMedia>
          <EmptyTitle>{MESSAGES.empty.adminDashboard.title}</EmptyTitle>
          <EmptyDescription>
            {MESSAGES.empty.adminDashboard.description}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href="/admin/trainers">
              {MESSAGES.empty.adminDashboard.cta}
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    </>
  );
}
