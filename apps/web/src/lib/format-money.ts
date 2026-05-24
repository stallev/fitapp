export function formatMoney(
  amountCents: number,
  currency = "USD",
  locale = "ru-RU",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amountCents / 100);
}
