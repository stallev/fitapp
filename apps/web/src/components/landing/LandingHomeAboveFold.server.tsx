import { LandingHero } from "@/components/landing/LandingHero";
import { LandingJsonLd } from "@/components/landing/LandingJsonLd";
import { LandingNav } from "@/components/landing/LandingNav.server";
import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/constants";
import { getLandingHeroFloatCards } from "@/lib/landing/landing-hero-float-cards";
import {
  getCachedLandingPageMessages,
  getDefaultLandingPageMessages,
  type LandingPageMessages,
} from "@/lib/landing/landing-page-messages.server";
import { getLocale } from "@/lib/messages/server";

function LandingHomeAboveFoldView({
  pageMessages,
  locale,
}: {
  pageMessages: LandingPageMessages;
  locale: AppLocale;
}) {
  const floatCards = getLandingHeroFloatCards(pageMessages);

  return (
    <>
      <LandingJsonLd
        messages={{
          landing: pageMessages.landing,
          site: pageMessages.site,
        }}
        locale={locale}
      />
      <LandingNav messages={pageMessages} />
      <LandingHero hero={pageMessages.landing.hero} floatCards={floatCards} />
    </>
  );
}

export function LandingHomeAboveFoldFallback() {
  return (
    <LandingHomeAboveFoldView
      pageMessages={getDefaultLandingPageMessages()}
      locale={DEFAULT_LOCALE}
    />
  );
}

export async function LandingHomeAboveFold() {
  const locale = await getLocale();
  const pageMessages = await getCachedLandingPageMessages(locale);

  return <LandingHomeAboveFoldView pageMessages={pageMessages} locale={locale} />;
}
