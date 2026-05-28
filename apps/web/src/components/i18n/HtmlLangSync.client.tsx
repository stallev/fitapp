"use client";

import { useEffect } from "react";

import { useLocale } from "@/components/i18n/LocaleProvider.client";

export function HtmlLangSync() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
