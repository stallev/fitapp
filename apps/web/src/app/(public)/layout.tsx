import { TopBar } from "@/components/shell/TopBar";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <TopBar />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
