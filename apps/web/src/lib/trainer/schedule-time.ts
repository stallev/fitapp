function formatPrismaTime(value: Date): string {
  const hours = value.getUTCHours();
  const minutes = value.getUTCMinutes();
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function formatPrismaDate(value: Date): string {
  return value.toISOString().slice(0, 10);
}

export { formatPrismaTime };
