import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/constants";
import { CACHE_TAGS } from "@/lib/cache/tags";
import { getMessagesForLocale } from "@/lib/messages/locale-catalog";
import type { Messages } from "@/lib/messages/types";

export type LandingPageMessages = Pick<
  Messages,
  "landing" | "site" | "locale" | "howItWasBuilt" | "common"
>;

export function getDefaultLandingPageMessages(): LandingPageMessages {
  const messages = getMessagesForLocale(DEFAULT_LOCALE);
  return {
    landing: messages.landing,
    site: messages.site,
    locale: messages.locale,
    howItWasBuilt: messages.howItWasBuilt,
    common: messages.common,
  };
}

export async function getCachedLandingPageMessages(
  locale: AppLocale,
): Promise<LandingPageMessages> {
  "use cache";
  cacheTag(CACHE_TAGS.landingCopy(locale));
  cacheLife("hours");

  const messages = getMessagesForLocale(locale);
  return {
    landing: messages.landing,
    site: messages.site,
    locale: messages.locale,
    howItWasBuilt: messages.howItWasBuilt,
    common: messages.common,
  };
}
