import * as React from "react";

import { cn } from "@/lib/utils";

export type TimeSlotButtonProps = Omit<
  React.ComponentProps<"button">,
  "type"
> & {
  available?: boolean;
};

export function TimeSlotButton({
  available = true,
  className,
  children,
  disabled,
  ...props
}: TimeSlotButtonProps) {
  const isDisabled = disabled ?? !available;

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-lg font-mono text-[13px] transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2",
        available
          ? "border border-border bg-card text-foreground hover:border-primary hover:text-primary"
          : "cursor-not-allowed bg-[hsl(var(--color-surface-container))] text-subtle-foreground line-through",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
