import { redirect } from "next/navigation";
import { Suspense } from "react";

import { auth } from "@/auth";
import { AppShell } from "@/components/shell/AppShell";
import { ProductQueryToast } from "@/components/shell/ProductQueryToast.client";
import { getAdminNavBadges } from "@/data/admin/get-admin-nav-badges.server";
import { USER_ROLE } from "@pulse/domain";

import { getNavItems } from "@/lib/nav/nav-config";

export default async function AdminLayout({
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
    <>
      <Suspense fallback={null}>
        <ProductQueryToast />
      </Suspense>
      <AppShell role={USER_ROLE.ADMIN} navItems={navItems} badges={badges}>
        {children}
      </AppShell>
    </>
  );
}
