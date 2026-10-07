import dynamic from "next/dynamic";

import { MarketingNavScrollFrame } from "@/components/landing/MarketingNavScrollFrame.client";
import { PulseLogo } from "@/components/ui/PulseLogo";
import { getMessages } from "@/lib/messages/server";

const MarketingNavDesktopLinks = dynamic(
  () =>
    import("@/components/landing/MarketingNavDesktopLinks.client").then(
      (module) => ({ default: module.MarketingNavDesktopLinks }),
    ),
);

const MarketingNavActions = dynamic(
  () =>
    import("@/components/landing/MarketingNavActions.client").then(
      (module) => ({ default: module.MarketingNavActions }),
    ),
);

export async function MarketingNav() {
  const messages = await getMessages();
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
