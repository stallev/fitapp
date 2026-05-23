import type { TrainerServiceItem } from "@/lib/trainer/trainer-profile";

export function formatBookingPrice(cents: number, currency: string): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function formatBookingDateTime(
  startsAtUtc: string,
  timezone: string,
): string {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: timezone,
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(startsAtUtc));
}

export function findSelectedService(
  services: TrainerServiceItem[],
  serviceId: string | null,
): TrainerServiceItem | null {
  if (!serviceId) {
    return services[0] ?? null;
  }

  return services.find((service) => service.id === serviceId) ?? services[0] ?? null;
}

export const BOOKING_WIZARD_TOTAL_STEPS = 3;

export const BOOKING_WIZARD_STEP = {
  service: 1,
  slot: 2,
  confirm: 3,
} as const;

/** Calendar days shown in the booking wizard slot step (today + next 6). */
export const BOOKING_WIZARD_SLOT_DAY_COUNT = 7;
