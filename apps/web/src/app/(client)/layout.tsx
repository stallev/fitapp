import { redirect } from "next/navigation";
import { Suspense } from "react";

import { auth } from "@/auth";
import { AppShell } from "@/components/shell/AppShell";
import { ProductQueryToast } from "@/components/shell/ProductQueryToast.client";
import { USER_ROLE } from "@pulse/domain";

import { getNavItems } from "@/lib/nav/nav-config";

export default async function ClientLayout({
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
    <>
      <Suspense fallback={null}>
        <ProductQueryToast />
      </Suspense>
      <AppShell role={USER_ROLE.CLIENT} navItems={navItems}>
        {children}
      </AppShell>
    </>
  );
}
