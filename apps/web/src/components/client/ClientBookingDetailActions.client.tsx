"use client";

import { useState } from "react";
import { toast } from "sonner";

import { ClientBookingCancelDialog } from "@/components/client/ClientBookingCancelDialog.client";
import { Button } from "@/components/ui/button";
import { CustomLink } from "@/components/ui/CustomLink";

import { MESSAGES } from "@/lib/messages";
import { PRODUCT_TOAST_DURATION_MS } from "@/lib/ui/product-toast";

export type ClientBookingDetailActionsProps = {
  bookingId: string;
  canCancel: boolean;
  canLeaveReview: boolean;
};

export function ClientBookingDetailActions({
  bookingId,
  canCancel,
  canLeaveReview,
}: ClientBookingDetailActionsProps) {
  const [cancelOpen, setCancelOpen] = useState(false);

  const handleJoinClick = () => {
    toast.info(MESSAGES.placeholders.sessionVideo, {
      duration: PRODUCT_TOAST_DURATION_MS,
    });
  };

  if (!canCancel && !canLeaveReview) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row">
        {canCancel ? (
          <>
            <Button
              type="button"
              variant="default"
              className="min-h-11 flex-1"
              onClick={handleJoinClick}
            >
              {MESSAGES.booking.actions.join}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="min-h-11 flex-1"
              onClick={() => setCancelOpen(true)}
            >
              {MESSAGES.booking.cancel.button}
            </Button>
          </>
        ) : null}

        {canLeaveReview ? (
          <Button asChild variant="secondary" className="min-h-11 w-full">
            <CustomLink href={`/client/reviews/${bookingId}`}>
              {MESSAGES.booking.actions.leaveReview}
            </CustomLink>
          </Button>
        ) : null}
      </div>

      {canCancel ? (
        <ClientBookingCancelDialog
          bookingId={bookingId}
          open={cancelOpen}
          onOpenChange={setCancelOpen}
        />
      ) : null}
    </>
  );
}
