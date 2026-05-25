import { SearchIcon } from "lucide-react";

import { CustomLink } from "@/components/ui/CustomLink";

import { MESSAGES } from "@/lib/messages";

export function ClientDashboardSearchEntry() {
  return (
    <CustomLink
      as="button"
      variant="outline"
      href="/trainers"
      aria-label={MESSAGES.dashboard.client.searchAriaLabel}
      className="h-12 w-full justify-start gap-3 rounded-full px-4 text-left md:h-14 md:px-5"
    >
      <SearchIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      <span className="truncate text-muted-foreground">
        {MESSAGES.dashboard.client.searchPlaceholder}
      </span>
    </CustomLink>
  );
}
