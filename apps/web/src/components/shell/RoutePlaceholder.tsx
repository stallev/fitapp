import { ContentText, Heading } from "@/components/atoms";
import { MESSAGES } from "@/lib/messages";

type RoutePlaceholderProps = {
  title: string;
  description?: string;
};

export function RoutePlaceholder({
  title,
  description = MESSAGES.placeholders.pageStub,
}: RoutePlaceholderProps) {
  return (
    <>
      <Heading as="h1" visualLevel="h3">
        {title}
      </Heading>
      <ContentText variant="bodyMuted" className="mt-4">
        {description}
      </ContentText>
    </>
  );
}
