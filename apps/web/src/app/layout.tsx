import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Source_Serif_4 } from "next/font/google";
import { Suspense } from "react";

import { PulseGoogleAnalytics } from "@/components/analytics/PulseGoogleAnalytics";
import { RootLayoutLocaleBridgeServer } from "@/components/i18n/RootLayoutLocaleBridge.server";
import { RootLayoutProviders } from "@/components/i18n/RootLayoutProviders";
import { readLocaleCookie } from "@/lib/i18n/cookie";
import { DEFAULT_LOCALE } from "@/lib/i18n/constants";
import { getMessages } from "@/lib/messages/server";
import { getMessagesForLocale } from "@/lib/messages/locale-catalog";
import { getSiteUrl } from "@/lib/site/site-url";
import { cn } from "@/lib/utils";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

const fontClassName = cn(
  manrope.variable,
  sourceSerif4.variable,
  jetbrainsMono.variable,
  "h-full antialiased",
);

export async function generateMetadata(): Promise<Metadata> {
  const cookieLocale = await readLocaleCookie();
  const messages = await getMessages(cookieLocale ?? DEFAULT_LOCALE);
  return {
    metadataBase: getSiteUrl(),
    title: messages.site.title,
    description: messages.site.description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialMessages = getMessagesForLocale(DEFAULT_LOCALE);

  return (
    <html lang={DEFAULT_LOCALE} suppressHydrationWarning className={fontClassName}>
      <body className="min-h-full flex flex-col">
        <RootLayoutProviders locale={DEFAULT_LOCALE} messages={initialMessages}>
          <Suspense fallback={null}>
            <RootLayoutLocaleBridgeServer />
          </Suspense>
          {children}
        </RootLayoutProviders>
        <PulseGoogleAnalytics />
      </body>
    </html>
  );
}
