"use client";

import { StarIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ClientBookingCancelDialog } from "@/components/client/ClientBookingCancelDialog.client";
import { ClientFileComplaintDialog } from "@/components/client/ClientFileComplaintDialog.client";
import { ClientRequestRefundDialog } from "@/components/client/ClientRequestRefundDialog.client";
import { Button } from "@/components/ui/button";
import { CustomLink } from "@/components/ui/CustomLink";

import { MESSAGES } from "@/lib/messages";
import { PRODUCT_TOAST_DURATION_MS } from "@/lib/ui/product-toast";

export type ClientBookingDetailActionsProps = {
  bookingId: string;
  priceCents: number;
  canCancel: boolean;
  canLeaveReview: boolean;
  canFileComplaint: boolean;
  canRequestRefund: boolean;
};

export function ClientBookingDetailActions({
  bookingId,
  priceCents,
  canCancel,
  canLeaveReview,
  canFileComplaint,
  canRequestRefund,
}: ClientBookingDetailActionsProps) {
  const [cancelOpen, setCancelOpen] = useState(false);

  const handleJoinClick = () => {
    toast.info(MESSAGES.placeholders.sessionVideo, {
      duration: PRODUCT_TOAST_DURATION_MS,
    });
  };

  const hasSupportActions = canFileComplaint || canRequestRefund;
  const hasPrimaryActions = canCancel || canLeaveReview;

  if (!hasPrimaryActions && !hasSupportActions) {
    return null;
  }

  return (
    <>
      <div className="space-y-3">
        {canLeaveReview ? (
          <Button asChild variant="tonal" className="min-h-11 w-full">
            <CustomLink href={`/client/reviews/${bookingId}`}>
              <StarIcon className="size-3.5" aria-hidden />
              {MESSAGES.booking.actions.leaveReview}
            </CustomLink>
          </Button>
        ) : null}

        {canCancel ? (
          <div className="flex flex-col gap-2 sm:flex-row">
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
          </div>
        ) : null}

        {hasSupportActions ? (
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {canFileComplaint ? (
              <ClientFileComplaintDialog bookingId={bookingId} />
            ) : null}
            {canRequestRefund ? (
              <ClientRequestRefundDialog
                bookingId={bookingId}
                maxAmountCents={priceCents}
              />
            ) : null}
          </div>
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
