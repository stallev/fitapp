import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, JetBrains_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/providers/ThemeProvider.client";
import { Toaster } from "@/components/ui/sonner";
import { MESSAGES } from "@/lib/messages";
import { cn } from "@/lib/utils";

import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"] as unknown as ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"] as unknown as ["latin", "latin-ext"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"] as unknown as ["latin", "latin-ext"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: MESSAGES.site.title,
  description: MESSAGES.site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={cn(
        dmSans.variable,
        dmSerifDisplay.variable,
        jetbrainsMono.variable,
        "h-full antialiased",
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
