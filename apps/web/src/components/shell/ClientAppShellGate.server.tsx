import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AppShell } from "@/components/shell/AppShell";
import { USER_ROLE } from "@pulse/domain";
import { getNavItems } from "@/lib/nav/nav-config";

export async function ClientAppShellGate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (!session?.user?.role) {
    redirect("/auth/login");
  }

  if (session.user.role !== USER_ROLE.CLIENT) {
    redirect("/auth/login");
  }

  const navItems = getNavItems(USER_ROLE.CLIENT);

  return (
    <AppShell role={USER_ROLE.CLIENT} navItems={navItems}>
      {children}
    </AppShell>
  );
}
