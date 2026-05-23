import { USER_ROLE, type UserRole } from "@pulse/domain";

import { MESSAGES } from "@/lib/messages";

export type NavBadgeKey =
  | "pendingTrainers"
  | "openComplaints"
  | "pendingRefunds";

export type NavIconKey =
  | "home"
  | "search"
  | "calendar"
  | "user"
  | "dumbbell"
  | "users"
  | "dollar"
  | "shield"
  | "flag"
  | "refresh"
  | "star";

/** Serializable nav item — safe to pass from RSC layouts to client nav. */
export type NavItemConfig = {
  label: string;
  href: string;
  iconKey: NavIconKey;
  badgeKey?: NavBadgeKey;
};

export type AdminNavBadges = Partial<Record<NavBadgeKey, number>>;

const CLIENT_NAV: NavItemConfig[] = [
  {
    label: MESSAGES.nav.client.home,
    href: "/client/dashboard",
    iconKey: "home",
  },
  {
    label: MESSAGES.nav.client.trainers,
    href: "/trainers",
    iconKey: "search",
  },
  {
    label: MESSAGES.nav.client.sessions,
    href: "/client/bookings",
    iconKey: "calendar",
  },
  {
    label: MESSAGES.nav.client.profile,
    href: "/client/profile",
    iconKey: "user",
  },
];

const TRAINER_NAV: NavItemConfig[] = [
  {
    label: MESSAGES.nav.trainer.today,
    href: "/trainer/dashboard",
    iconKey: "home",
  },
  {
    label: MESSAGES.nav.trainer.schedule,
    href: "/trainer/schedule",
    iconKey: "calendar",
  },
  {
    label: MESSAGES.nav.trainer.services,
    href: "/trainer/services",
    iconKey: "dumbbell",
  },
  {
    label: MESSAGES.nav.trainer.clients,
    href: "/trainer/clients",
    iconKey: "users",
  },
  {
    label: MESSAGES.nav.trainer.income,
    href: "/trainer/income",
    iconKey: "dollar",
  },
];

const ADMIN_NAV: NavItemConfig[] = [
  {
    label: MESSAGES.nav.admin.overview,
    href: "/admin/dashboard",
    iconKey: "home",
  },
  {
    label: MESSAGES.nav.admin.trainers,
    href: "/admin/trainers",
    iconKey: "shield",
    badgeKey: "pendingTrainers",
  },
  {
    label: MESSAGES.nav.admin.complaints,
    href: "/admin/complaints",
    iconKey: "flag",
    badgeKey: "openComplaints",
  },
  {
    label: MESSAGES.nav.admin.refunds,
    href: "/admin/refunds",
    iconKey: "refresh",
    badgeKey: "pendingRefunds",
  },
  {
    label: MESSAGES.nav.admin.reviews,
    href: "/admin/reviews",
    iconKey: "star",
  },
];

export function getNavItems(role: UserRole): NavItemConfig[] {
  switch (role) {
    case USER_ROLE.CLIENT:
      return CLIENT_NAV;
    case USER_ROLE.TRAINER:
      return TRAINER_NAV;
    case USER_ROLE.ADMIN:
      return ADMIN_NAV;
    default:
      return [];
  }
}

export function getNavSectionTitle(role: UserRole): string {
  switch (role) {
    case USER_ROLE.CLIENT:
      return MESSAGES.shell.sectionClient;
    case USER_ROLE.TRAINER:
      return MESSAGES.shell.sectionTrainer;
    case USER_ROLE.ADMIN:
      return MESSAGES.shell.sectionAdmin;
    default:
      return "";
  }
}

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/trainers") {
    return pathname === "/trainers" || pathname.startsWith("/trainers/");
  }

  if (href.endsWith("/dashboard")) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function resolveBadgeCount(
  badgeKey: NavBadgeKey | undefined,
  badges: AdminNavBadges | undefined,
): number {
  if (!badgeKey || !badges) {
    return 0;
  }

  return badges[badgeKey] ?? 0;
}
