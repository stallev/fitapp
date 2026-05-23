import { CheckIcon } from "lucide-react";

import { StatusBadge } from "@/components/ui/StatusBadge";

export type VerifiedBadgeProps = Omit<
  React.ComponentProps<typeof StatusBadge>,
  "status" | "icon"
>;

export function VerifiedBadge({ children = "Verified", ...props }: VerifiedBadgeProps) {
  return (
    <StatusBadge
      status="verified"
      icon={<CheckIcon aria-hidden className="size-3" strokeWidth={3} />}
      {...props}
    >
      {children}
    </StatusBadge>
  );
}
