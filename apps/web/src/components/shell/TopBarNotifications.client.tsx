"use client";

import { BellIcon } from "lucide-react";

import { ContentText } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MESSAGES } from "@/lib/messages";

export function TopBarNotifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={MESSAGES.shell.notifications}
        >
          <BellIcon aria-hidden className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72">
        <ContentText variant="muted" as="p">
          {MESSAGES.shell.notificationsEmpty}
        </ContentText>
      </PopoverContent>
    </Popover>
  );
}
