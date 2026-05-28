import { MarketingNavActions } from "@/components/landing/MarketingNavActions.client";
import { MarketingNavDesktopLinks } from "@/components/landing/MarketingNavDesktopLinks.client";
import { MarketingNavScrollFrame } from "@/components/landing/MarketingNavScrollFrame.client";
import { PulseLogo } from "@/components/ui/PulseLogo";
import type { LandingPageMessages } from "@/lib/landing/landing-page-messages.server";
import { getCachedLandingPageMessages } from "@/lib/landing/landing-page-messages.server";
import { getLocale } from "@/lib/messages/server";

type MarketingNavProps = {
  messages: Pick<
    LandingPageMessages,
    "landing" | "site" | "locale" | "howItWasBuilt"
  >;
};

export function MarketingNav({ messages }: MarketingNavProps) {
  const { nav } = messages.landing;

  return (
    <MarketingNavScrollFrame navAriaLabel={messages.locale.navAriaLabel}>
      <PulseLogo
        href="/"
        className="text-[20px] md:text-[22px]"
        homeAriaLabel={messages.site.logoHomeAriaLabel}
      />
      <MarketingNavDesktopLinks
        linkLabels={nav.links}
        caseStudyLabel={messages.howItWasBuilt.nav.link}
      />
      <MarketingNavActions
        linkLabels={nav.links}
        caseStudyLabel={messages.howItWasBuilt.nav.link}
        getStartedLabel={nav.getStarted}
        signInLabel={nav.signIn}
      />
    </MarketingNavScrollFrame>
  );
}

export async function MarketingNavLoader() {
  const locale = await getLocale();
  const pageMessages = await getCachedLandingPageMessages(locale);
  return <MarketingNav messages={pageMessages} />;
}
