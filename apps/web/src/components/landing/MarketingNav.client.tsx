"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher.client";
import { useMessages } from "@/components/i18n/LocaleProvider.client";
import { MarketingNavMobileMenu } from "@/components/landing/MarketingNavMobileMenu.client";
import { ThemeToggle } from "@/components/shell/ThemeToggle.client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLandingScrolled } from "@/lib/ui/use-landing-scrolled";

const HOW_IT_WAS_BUILT_PATH = "/how-it-was-built";

export function MarketingNav() {
  const messages = useMessages();
  const pathname = usePathname();
  const scrolled = useLandingScrolled();
  const isLanding = pathname === "/";
  const isCaseStudyPage = pathname === HOW_IT_WAS_BUILT_PATH;

  const anchorLinks = [
    { href: isLanding ? "#how" : "/#how", label: messages.landing.nav.links.how },
    {
      href: isLanding ? "#trainers" : "/#trainers",
      label: messages.landing.nav.links.trainers,
    },
    {
      href: isLanding ? "#reviews" : "/#reviews",
      label: messages.landing.nav.links.reviews,
    },
    { href: isLanding ? "#faq" : "/#faq", label: messages.landing.nav.links.faq },
  ] as const;

  return (
    <nav
      aria-label={messages.locale.navAriaLabel}
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between px-4 transition-all duration-300 md:h-[72px] md:px-14",
        (scrolled || !isLanding) &&
          "border-b border-border/60 bg-background/95 shadow-[var(--shadow-card)] backdrop-blur-xl",
      )}
    >
      <Link
        href="/"
        className="shrink-0 font-heading text-[20px] tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-[22px]"
      >
        {messages.site.logoLabel}
      </Link>

      <ul className="hidden list-none gap-8 md:flex">
        {anchorLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          {isCaseStudyPage ? (
            <span
              aria-current="page"
              className="text-sm font-medium whitespace-nowrap text-primary"
            >
              {messages.howItWasBuilt.nav.link}
            </span>
          ) : (
            <Link
              href={HOW_IT_WAS_BUILT_PATH}
              className="text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:text-primary"
            >
              {messages.howItWasBuilt.nav.link}
            </Link>
          )}
        </li>
      </ul>

      <div className="flex min-w-0 items-center gap-2 md:gap-2.5">
        <div className="flex items-center gap-1.5 md:hidden">
          <Button asChild size="sm" className="shrink-0 rounded-full px-4">
            <Link href="/auth/register">{messages.landing.nav.getStarted}</Link>
          </Button>
          <div className="flex min-h-11 min-w-11 shrink-0 items-center justify-center">
            <ThemeToggle size="icon" />
          </div>
          <MarketingNavMobileMenu
            anchorLinks={anchorLinks}
            caseStudyHref={HOW_IT_WAS_BUILT_PATH}
            caseStudyLabel={messages.howItWasBuilt.nav.link}
            isCaseStudyCurrent={isCaseStudyPage}
          />
        </div>

        <div className="hidden items-center gap-2.5 md:flex">
          <LocaleSwitcher variant="compact" />
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="rounded-full">
            <Link href="/auth/login">{messages.landing.nav.signIn}</Link>
          </Button>
          <Button asChild size="sm" className="rounded-full px-[22px]">
            <Link href="/auth/register">{messages.landing.nav.getStarted}</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
