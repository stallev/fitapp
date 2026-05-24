export const SCHEDULE_WEEKDAYS = [
  { dayOfWeek: 0, short: "Пн", label: "Понедельник" },
  { dayOfWeek: 1, short: "Вт", label: "Вторник" },
  { dayOfWeek: 2, short: "Ср", label: "Среда" },
  { dayOfWeek: 3, short: "Чт", label: "Четверг" },
  { dayOfWeek: 4, short: "Пт", label: "Пятница" },
  { dayOfWeek: 5, short: "Сб", label: "Суббота" },
  { dayOfWeek: 6, short: "Вс", label: "Воскресенье" },
] as const;

export function groupIntervalsByDay<T extends { dayOfWeek: number }>(
  intervals: T[],
): Map<number, T[]> {
  const grouped = new Map<number, T[]>();

  for (const day of SCHEDULE_WEEKDAYS) {
    grouped.set(day.dayOfWeek, []);
  }

  for (const interval of intervals) {
    const list = grouped.get(interval.dayOfWeek) ?? [];
    list.push(interval);
    grouped.set(interval.dayOfWeek, list);
  }

  return grouped;
}
