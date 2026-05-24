import { ContentText } from "@/components/atoms";
import { PageHeader } from "@/components/ui/PageHeader";
import { MESSAGES } from "@/lib/messages";

export function AdminDashboardHeader() {
  return (
    <div>
      <ContentText as="p" className="text-sm text-muted-foreground">
        {MESSAGES.dashboard.adminSubtitle}
      </ContentText>
      <PageHeader title={MESSAGES.dashboard.adminTitle} className="mt-1" />
    </div>
  );
}
