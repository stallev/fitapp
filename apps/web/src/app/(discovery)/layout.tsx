import { DiscoveryLayoutShell } from "@/components/shell/DiscoveryLayoutShell";

export default function DiscoveryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DiscoveryLayoutShell>{children}</DiscoveryLayoutShell>;
}
