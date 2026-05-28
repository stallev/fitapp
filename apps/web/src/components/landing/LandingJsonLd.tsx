import type { AppLocale } from "@/lib/i18n/constants";
import type { Messages } from "@/lib/messages/types";

import { buildLandingJsonLd } from "@/lib/landing/landing-json-ld";
import { serializeJsonLd } from "@/lib/landing/serialize-json-ld";

type LandingJsonLdProps = {
  messages: Pick<Messages, "landing" | "site">;
  locale: AppLocale;
};

export function LandingJsonLd({ messages, locale }: LandingJsonLdProps) {
  const jsonLd = buildLandingJsonLd(messages, locale);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
    />
  );
}
