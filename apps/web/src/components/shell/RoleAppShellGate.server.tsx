import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AppShell } from "@/components/shell/AppShell";
import { TrainerReviewBanner } from "@/components/shell/TrainerReviewBanner";
import { getAdminNavBadges } from "@/data/admin/get-admin-nav-badges.server";
import { getTrainerShellContext } from "@/data/trainer/get-trainer-shell-context.server";
import { USER_ROLE, type UserRole } from "@pulse/domain";
import { getNavItems } from "@/lib/nav/nav-config";

type RoleAppShellGateProps = {
  expectedRole: UserRole;
  children: React.ReactNode;
};

export async function RoleAppShellGate({
  expectedRole,
  children,
}: Readonly<RoleAppShellGateProps>) {
  const session = await auth();

  if (!session?.user?.role || session.user.role !== expectedRole) {
    redirect("/auth/login");
  }

  const navItems = getNavItems(expectedRole);

  if (expectedRole === USER_ROLE.TRAINER) {
    const shellContext = await getTrainerShellContext(session.user.id);

    return (
      <AppShell
        role={USER_ROLE.TRAINER}
        navItems={navItems}
        banner={shellContext.showReviewBanner ? <TrainerReviewBanner /> : null}
      >
        {children}
      </AppShell>
    );
  }

  if (expectedRole === USER_ROLE.ADMIN) {
    const badges = await getAdminNavBadges();

    return (
      <AppShell role={USER_ROLE.ADMIN} navItems={navItems} badges={badges}>
        {children}
      </AppShell>
    );
  }

  return (
    <AppShell role={USER_ROLE.CLIENT} navItems={navItems}>
      {children}
    </AppShell>
  );
}
