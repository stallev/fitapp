import { CameraIcon } from "lucide-react";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { ContentText } from "@/components/atoms";
import { cn } from "@/lib/utils";

const photoSlotVariants = cva(
  "relative overflow-hidden rounded-2xl bg-muted",
  {
    variants: {
      aspect: {
        square: "aspect-square",
        cover: "aspect-[4/3]",
        banner: "aspect-[16/6]",
      },
    },
    defaultVariants: { aspect: "square" },
  },
);

export type PhotoSlotProps = React.ComponentProps<"div"> &
  VariantProps<typeof photoSlotVariants> & {
    label: string;
    icon?: React.ReactNode;
  };

export function PhotoSlot({
  label,
  aspect,
  icon,
  className,
  ...props
}: PhotoSlotProps) {
  return (
    <div
      className={cn(photoSlotVariants({ aspect }), className)}
      {...props}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0 8px, hsl(var(--primary) / 0.07) 8px 9px)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-subtle-foreground">
        <span className="text-primary/70">
          {icon ?? <CameraIcon aria-hidden className="size-7" strokeWidth={1.5} />}
        </span>
        <ContentText
          variant="mutedMicro"
          as="span"
          className="font-mono uppercase tracking-wide"
        >
          {label}
        </ContentText>
      </div>
    </div>
  );
}
