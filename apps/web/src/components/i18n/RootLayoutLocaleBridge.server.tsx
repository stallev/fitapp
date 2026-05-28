import { auth } from "@/auth";
import { LocaleHydrationBridge } from "@/components/i18n/LocaleProvider.client";
import { resolveLocale } from "@/lib/i18n/resolve-locale";
import { getMessages } from "@/lib/messages/server";

export async function RootLayoutLocaleBridgeServer() {
  const session = await auth();
  const locale = await resolveLocale({
    sessionLocale: session?.user?.locale,
  });
  const messages = await getMessages(locale);

  return <LocaleHydrationBridge locale={locale} messages={messages} />;
}
