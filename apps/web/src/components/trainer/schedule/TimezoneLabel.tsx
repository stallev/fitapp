import { ContentText } from "@/components/atoms";
import { CustomLink } from "@/components/ui/CustomLink";
import { MESSAGES } from "@/lib/messages";

export type TimezoneLabelProps = {
  label: string;
};

export function TimezoneLabel({ label }: TimezoneLabelProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ContentText variant="muted" as="p" className="font-mono text-xs">
        {label}
      </ContentText>
      <CustomLink href="/trainer/profile" className="text-xs">
        {MESSAGES.trainer.schedule.timezoneEditLink}
      </CustomLink>
    </div>
  );
}
