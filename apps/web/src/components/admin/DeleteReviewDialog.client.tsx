"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { deleteReviewAction } from "@/actions/admin/moderate-review";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MESSAGES } from "@/lib/messages";
import { PRODUCT_TOAST_DURATION_MS } from "@/lib/ui/product-toast";

export type DeleteReviewDialogProps = {
  reviewId: string;
};

export function DeleteReviewDialog({ reviewId }: DeleteReviewDialogProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteReviewAction({ reviewId });
      if (!result.ok) {
        toast.error(result.message, { duration: PRODUCT_TOAST_DURATION_MS });
        router.refresh();
        return;
      }

      toast.success(MESSAGES.admin.reviews.deleteSuccess, {
        duration: PRODUCT_TOAST_DURATION_MS,
      });
      router.refresh();
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          className="min-h-11"
          disabled={isPending}
          aria-busy={isPending}
        >
          {MESSAGES.admin.reviews.delete}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{MESSAGES.admin.reviews.delete}</AlertDialogTitle>
          <AlertDialogDescription>
            {MESSAGES.admin.reviews.confirmDelete}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {MESSAGES.shell.back}
          </AlertDialogCancel>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            aria-busy={isPending}
          >
            {isPending
              ? MESSAGES.admin.reviews.deleting
              : MESSAGES.admin.reviews.delete}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
