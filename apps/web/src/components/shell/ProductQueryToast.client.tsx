"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { MESSAGES } from "@/lib/messages";
import {
  PRODUCT_TOAST_DURATION_MS,
  PRODUCT_TOAST_QUERY_KEYS,
} from "@/lib/ui/product-toast";

export function ProductQueryToast() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const saved = searchParams.get(PRODUCT_TOAST_QUERY_KEYS.saved);
    if (!saved) {
      return;
    }

    toast.success(MESSAGES.toast.saved, {
      duration: PRODUCT_TOAST_DURATION_MS,
    });

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete(PRODUCT_TOAST_QUERY_KEYS.saved);
    const query = nextParams.toString();
    router.replace(query ? `?${query}` : ".", { scroll: false });
  }, [router, searchParams]);

  return null;
}
