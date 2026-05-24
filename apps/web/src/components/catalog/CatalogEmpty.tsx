import Link from "next/link";
import { SearchXIcon } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { MESSAGES } from "@/lib/messages";

export function CatalogEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchXIcon aria-hidden />
        </EmptyMedia>
        <EmptyTitle>{MESSAGES.catalog.empty.title}</EmptyTitle>
        <EmptyDescription>{MESSAGES.catalog.empty.description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link href="/trainers">{MESSAGES.catalog.empty.cta}</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
