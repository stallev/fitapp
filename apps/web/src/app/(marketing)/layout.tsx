import { PublicChrome } from "@/components/shell/PublicChrome";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PublicChrome>{children}</PublicChrome>;
}
