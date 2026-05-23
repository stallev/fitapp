import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AppShell } from "@/components/shell/AppShell";
import { TrainerReviewBanner } from "@/components/shell/TrainerReviewBanner";
import { getTrainerShellContext } from "@/data/trainer/get-trainer-shell-context.server";
import { USER_ROLE } from "@pulse/domain";
import { getNavItems } from "@/lib/nav/nav-config";

export async function TrainerAppShellGate({
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
    <AppShell
      role={USER_ROLE.TRAINER}
      navItems={navItems}
      banner={shellContext.showReviewBanner ? <TrainerReviewBanner /> : null}
    >
      {children}
    </AppShell>
  );
}
