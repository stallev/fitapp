import { Suspense } from "react";

import { TopBar } from "@/components/shell/TopBar";
import { TopBarFallback } from "@/components/shell/TopBarFallback";

type PublicChromeProps = {
  children: React.ReactNode;
};

export function PublicChrome({ children }: PublicChromeProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Suspense fallback={<TopBarFallback />}>
        <TopBar />
      </Suspense>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
