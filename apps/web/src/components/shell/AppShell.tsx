import type { UserRole } from "@pulse/domain";

import { BottomNav } from "@/components/shell/BottomNav.client";
import { PageContainer } from "@/components/shell/PageContainer";
import { SidebarNav } from "@/components/shell/SidebarNav.client";
import { TopBar } from "@/components/shell/TopBar";
import type { AdminNavBadges, NavItemConfig } from "@/lib/nav/nav-config";
import { getNavSectionTitle } from "@/lib/nav/nav-config";

type AppShellProps = {
  role: UserRole;
  navItems: NavItemConfig[];
  badges?: AdminNavBadges;
  banner?: React.ReactNode;
  children: React.ReactNode;
};

export function AppShell({
  role,
  navItems,
  badges,
  banner,
  children,
}: AppShellProps) {
  const sectionTitle = getNavSectionTitle(role);

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <TopBar />
      <div className="flex min-h-0 flex-1">
        <SidebarNav
          items={navItems}
          sectionTitle={sectionTitle}
          badges={badges}
        />
        <PageContainer>
          {banner ? <div className="mb-4">{banner}</div> : null}
          {children}
        </PageContainer>
      </div>
      <BottomNav items={navItems} badges={badges} />
    </div>
  );
}
