"use client";

import { useOptimistic, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { WISHLIST_MUTATION_ERROR_CODES } from "@pulse/domain";

import { Button } from "@/components/ui/button";
import { MESSAGES } from "@/lib/messages";
import { PRODUCT_TOAST_DURATION_MS } from "@/lib/ui/product-toast";
import { postToggleWishlist } from "@/lib/wishlist/post-toggle-wishlist";
import { cn } from "@/lib/utils";

export type WishlistToggleProps = {
  trainerProfileId: string;
  initialInWishlist: boolean;
  isAuthenticated: boolean;
  canToggle: boolean;
  className?: string;
};

export function WishlistToggle({
  trainerProfileId,
  initialInWishlist,
  isAuthenticated,
  canToggle,
  className,
}: WishlistToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isWishlisted, setOptimisticWishlist] = useOptimistic(
    initialInWishlist,
    (_current, next: boolean) => next,
  );

  if (!canToggle) {
    return null;
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (!isAuthenticated) {
      const callbackUrl = encodeURIComponent(pathname);
      router.push(`/auth/login?callbackUrl=${callbackUrl}`);
      return;
    }

    startTransition(async () => {
      const nextValue = !isWishlisted;
      setOptimisticWishlist(nextValue);

      const result = await postToggleWishlist({
        trainerProfileId,
        action: nextValue ? "add" : "remove",
      });

      if (!result.ok) {
        if (result.code === WISHLIST_MUTATION_ERROR_CODES.UNAUTHORIZED) {
          const callbackUrl = encodeURIComponent(pathname);
          router.push(`/auth/login?callbackUrl=${callbackUrl}`);
          return;
        }

        toast.error(result.message ?? MESSAGES.wishlist.error, {
          duration: PRODUCT_TOAST_DURATION_MS,
        });
      }
    });
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      className={cn(
        "min-h-11 min-w-11 rounded-full bg-card/95 shadow-sm backdrop-blur-sm",
        className,
      )}
      onClick={handleClick}
      disabled={isPending}
      aria-busy={isPending}
      aria-pressed={isWishlisted}
      aria-label={
        isWishlisted ? MESSAGES.wishlist.remove : MESSAGES.wishlist.add
      }
    >
      <Heart
        className={cn("size-5", isWishlisted && "fill-primary text-primary")}
        aria-hidden
      />
    </Button>
  );
}
