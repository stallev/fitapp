import { redirect } from "next/navigation";
import { Suspense } from "react";

import { auth } from "@/auth";
import { AppShell } from "@/components/shell/AppShell";
import { ProductQueryToast } from "@/components/shell/ProductQueryToast.client";
import { TrainerReviewBanner } from "@/components/shell/TrainerReviewBanner";
import { getTrainerShellContext } from "@/data/trainer/get-trainer-shell-context.server";
import { USER_ROLE } from "@pulse/domain";

import { getNavItems } from "@/lib/nav/nav-config";

export default async function TrainerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (!session?.user?.role || session.user.role !== USER_ROLE.TRAINER) {
    redirect("/auth/login");
  }

  const [navItems, shellContext] = await Promise.all([
    Promise.resolve(getNavItems(USER_ROLE.TRAINER)),
    getTrainerShellContext(session.user.id),
  ]);

  return (
    <>
      <Suspense fallback={null}>
        <ProductQueryToast />
      </Suspense>
      <AppShell
        role={USER_ROLE.TRAINER}
        navItems={navItems}
        banner={shellContext.showReviewBanner ? <TrainerReviewBanner /> : null}
      >
        {children}
      </AppShell>
    </>
  );
}
