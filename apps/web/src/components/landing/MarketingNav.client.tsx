"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher.client";
import { useMessages } from "@/components/i18n/LocaleProvider.client";
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
        "fixed inset-x-0 top-0 z-50 flex h-[72px] items-center justify-between px-6 transition-all duration-300 md:px-14",
        (scrolled || !isLanding) &&
          "border-b border-border/60 bg-background/95 shadow-[0_1px_0_rgba(26,48,40,0.09)] backdrop-blur-xl",
      )}
    >
      <Link
        href="/"
        className="font-heading text-[22px] tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

      <div className="flex items-center gap-2.5">
        <LocaleSwitcher variant="compact" />
        <Button asChild variant="ghost" size="sm" className="rounded-full">
          <Link href="/auth/login">{messages.landing.nav.signIn}</Link>
        </Button>
        <Button asChild size="sm" className="rounded-full px-[22px]">
          <Link href="/auth/register">{messages.landing.nav.getStarted}</Link>
        </Button>
      </div>
    </nav>
  );
}
