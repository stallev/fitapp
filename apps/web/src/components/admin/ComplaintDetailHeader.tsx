import { ChevronLeftIcon } from "lucide-react";

import { CustomLink } from "@/components/ui/CustomLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { MESSAGES } from "@/lib/messages";

export function ComplaintDetailHeader() {
  return (
    <div className="space-y-4">
      <CustomLink
        href="/admin/complaints"
        as="button"
        variant="ghost"
        size="sm"
        className="min-h-11 -ml-2"
      >
        <ChevronLeftIcon aria-hidden className="size-4" />
        {MESSAGES.shell.back}
      </CustomLink>
      <PageHeader title={MESSAGES.admin.complaints.detail} />
    </div>
  );
}
