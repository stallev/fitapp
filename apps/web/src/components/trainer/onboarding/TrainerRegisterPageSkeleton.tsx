import { Heading } from "@/components/atoms";
import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_LOCALE } from "@/lib/i18n/constants";
import { getMessagesForLocale } from "@/lib/messages/locale-catalog";

export function TrainerRegisterPageSkeleton() {
  const messages = getMessagesForLocale(DEFAULT_LOCALE);
  return (
    <div
      className="mx-auto w-full max-w-2xl px-4 md:px-0"
      aria-busy="true"
      aria-label={messages.trainer.onboarding.title}
    >
      <Heading as="h1" className="mb-6 text-center">
        {messages.trainer.onboarding.title}
      </Heading>
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-11 w-full rounded-full" />
      </div>
    </div>
  );
}
