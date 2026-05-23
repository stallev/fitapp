"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { isNavItemActive, type NavIconKey } from "@/lib/nav/nav-config";
import { getNavIcon } from "@/lib/nav/nav-icons.client";

type NavItemProps = {
  label: string;
  href: string;
  iconKey: NavIconKey;
  badgeCount?: number;
  layout?: "bottom" | "sidebar";
};

export function NavItem({
  label,
  href,
  iconKey,
  badgeCount = 0,
  layout = "bottom",
}: NavItemProps) {
  const Icon = getNavIcon(iconKey);
  const pathname = usePathname();
  const isActive = isNavItemActive(pathname, href);
  const showBadge = badgeCount > 0;

  if (layout === "sidebar") {
    return (
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex min-h-11 items-center gap-3 rounded-full px-4 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary-container text-on-primary-container"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        <Icon aria-hidden className="size-4 shrink-0" />
        <span className="truncate">{label}</span>
        {showBadge ? (
          <span
            aria-label={`${badgeCount} в очереди`}
            className="ml-auto inline-flex min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-semibold text-destructive-foreground"
          >
            {badgeCount > 99 ? "99+" : badgeCount}
          </span>
        ) : null}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 rounded-2xl px-2 py-1 text-[11px] font-medium transition-colors",
        isActive
          ? "bg-primary-container text-on-primary-container"
          : "text-muted-foreground",
      )}
    >
      <Icon aria-hidden className="size-5 shrink-0" />
      <span className="max-w-full truncate">{label}</span>
      {showBadge ? (
        <span
          aria-label={`${badgeCount} в очереди`}
          className="absolute right-1 top-1 inline-flex size-4 items-center justify-center rounded-full bg-destructive text-[9px] font-semibold text-destructive-foreground"
        >
          {badgeCount > 9 ? "9+" : badgeCount}
        </span>
      ) : null}
    </Link>
  );
}
