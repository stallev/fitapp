import { StrippedBookingHeader } from "@/components/shell/StrippedBookingHeader.client";
import { PageContainer } from "@/components/shell/PageContainer";

export default function BookingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <StrippedBookingHeader />
      <PageContainer variant="narrow" withBottomNav={false}>
        {children}
      </PageContainer>
    </div>
  );
}
