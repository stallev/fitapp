import { Suspense } from "react";

import { TopBar } from "@/components/shell/TopBar";
import { TopBarFallback } from "@/components/shell/TopBarFallback";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Suspense fallback={<TopBarFallback />}>
        <TopBar />
      </Suspense>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
