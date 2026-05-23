"use client";

import { NavItem } from "@/components/shell/NavItem";
import {
  resolveBadgeCount,
  type AdminNavBadges,
  type NavItemConfig,
} from "@/lib/nav/nav-config";

type BottomNavProps = {
  items: NavItemConfig[];
  badges?: AdminNavBadges;
};

export function BottomNav({ items, badges }: BottomNavProps) {
  return (
    <nav
      aria-label="Основная навигация"
      className="sticky bottom-0 z-40 border-t border-border/70 bg-background/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div
        className="mx-auto grid w-full max-w-md px-2"
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        {items.map((item) => (
          <NavItem
            key={item.href}
            label={item.label}
            href={item.href}
            iconKey={item.iconKey}
            badgeCount={resolveBadgeCount(item.badgeKey, badges)}
            layout="bottom"
          />
        ))}
      </div>
    </nav>
  );
}
