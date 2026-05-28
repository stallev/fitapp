"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import { type AppLocale } from "@/lib/i18n/constants";
import type { Messages } from "@/lib/messages/types";

type LocaleContextValue = {
  locale: AppLocale;
  messages: Messages;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const LocaleSetterContext = createContext<
  Dispatch<SetStateAction<LocaleContextValue>> | null
>(null);

export type LocaleProviderProps = {
  locale: AppLocale;
  messages: Messages;
  children: React.ReactNode;
};

export function LocaleProvider({
  locale,
  messages,
  children,
}: LocaleProviderProps) {
  const [value, setValue] = useState({ locale, messages });

  useEffect(() => {
    setValue((current) =>
      current.locale === locale ? current : { locale, messages },
    );
  }, [locale, messages]);

  return (
    <LocaleSetterContext.Provider value={setValue}>
      <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
    </LocaleSetterContext.Provider>
  );
}

export type LocaleHydrationBridgeProps = LocaleContextValue;

export function LocaleHydrationBridge({
  locale,
  messages,
}: LocaleHydrationBridgeProps) {
  const setValue = useContext(LocaleSetterContext);

  useEffect(() => {
    if (!setValue) {
      return;
    }

    setValue((current) =>
      current.locale === locale ? current : { locale, messages },
    );
  }, [locale, messages, setValue]);

  return null;
}

export function useLocale(): AppLocale {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context.locale;
}

export function useMessages(): Messages {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useMessages must be used within LocaleProvider");
  }
  return context.messages;
}
