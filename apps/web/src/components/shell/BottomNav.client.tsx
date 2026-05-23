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
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div
        className="mx-auto grid max-w-[1400px] px-2 pt-1"
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
