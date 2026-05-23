"use client";

import { Star } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const ratingStarsVariants = cva("inline-flex items-center gap-0.5", {
  variants: {
    size: {
      sm: "[&_svg]:size-3",
      md: "[&_svg]:size-3.5",
      lg: "[&_svg]:size-4",
    },
  },
  defaultVariants: { size: "md" },
});

export type RatingStarsProps = VariantProps<typeof ratingStarsVariants> & {
  value?: number;
  max?: number;
  interactive?: boolean;
  onChange?: (value: number) => void;
  className?: string;
  "aria-label"?: string;
};

export function RatingStars({
  value = 0,
  max = 5,
  size,
  interactive = false,
  onChange,
  className,
  "aria-label": ariaLabel,
}: RatingStarsProps) {
  const rounded = Math.round(value);

  if (interactive) {
    return (
      <span
        role="group"
        aria-label={ariaLabel ?? `Rating ${value} of ${max}`}
        className={cn(ratingStarsVariants({ size }), className)}
      >
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1;
          const filled = starValue <= rounded;
          return (
            <button
              key={starValue}
              type="button"
              aria-label={`Rate ${starValue} of ${max}`}
              aria-pressed={filled}
              onClick={() => onChange?.(starValue)}
              className={cn(
                "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full transition-transform",
                "hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                filled ? "text-secondary" : "text-muted",
              )}
            >
              <Star
                aria-hidden
                className={cn(filled && "fill-current")}
                strokeWidth={filled ? 0 : 2}
              />
            </button>
          );
        })}
      </span>
    );
  }

  return (
    <span
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      className={cn(ratingStarsVariants({ size }), "text-secondary", className)}
    >
      {Array.from({ length: max }, (_, index) =>
        index < rounded ? (
          <Star key={index} aria-hidden className="fill-current" strokeWidth={0} />
        ) : (
          <span key={index} className="text-muted">
            <Star aria-hidden strokeWidth={2} />
          </span>
        ),
      )}
    </span>
  );
}
