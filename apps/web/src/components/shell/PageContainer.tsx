import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "page" | "narrow";
  withBottomNav?: boolean;
};

export function PageContainer({
  children,
  className,
  variant = "page",
  withBottomNav = true,
}: PageContainerProps) {
  return (
    <Container
      as="main"
      variant="page"
      className={cn(
        "min-w-0 flex-1",
        withBottomNav ? "pb-24 md:pb-6" : "pb-6",
        variant === "narrow" && "max-w-2xl",
        className,
      )}
    >
      {children}
    </Container>
  );
}
