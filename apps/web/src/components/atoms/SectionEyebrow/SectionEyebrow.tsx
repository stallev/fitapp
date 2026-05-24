import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const sectionEyebrowVariants = cva(
  "inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em]",
  {
    variants: {
      tone: {
        default: "bg-primary-container text-primary",
        onDark:
          "bg-white/10 text-white/50",
        onPrimary:
          "bg-white/14 text-white/80",
        outline:
          "border border-primary/10 bg-primary-container text-primary",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

export type SectionEyebrowProps = React.ComponentProps<"span"> &
  VariantProps<typeof sectionEyebrowVariants>;

export function SectionEyebrow({
  tone,
  className,
  children,
  ...props
}: SectionEyebrowProps) {
  return (
    <span
      className={cn(sectionEyebrowVariants({ tone }), className)}
      {...props}
    >
      {children}
    </span>
  );
}
