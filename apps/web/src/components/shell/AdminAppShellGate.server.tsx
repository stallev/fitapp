import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AppShell } from "@/components/shell/AppShell";
import { getAdminNavBadges } from "@/data/admin/get-admin-nav-badges.server";
import { USER_ROLE } from "@pulse/domain";
import { getNavItems } from "@/lib/nav/nav-config";

export async function AdminAppShellGate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (!session?.user?.role || session.user.role !== USER_ROLE.ADMIN) {
    redirect("/auth/login");
  }

  const [navItems, badges] = await Promise.all([
    Promise.resolve(getNavItems(USER_ROLE.ADMIN)),
    getAdminNavBadges(),
  ]);

  return (
    <AppShell role={USER_ROLE.ADMIN} navItems={navItems} badges={badges}>
      {children}
    </AppShell>
  );
}
