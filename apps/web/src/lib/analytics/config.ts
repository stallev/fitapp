export function getGaMeasurementId(): string | undefined {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
}

export function isGoogleAnalyticsEnabled(): boolean {
  return Boolean(getGaMeasurementId());
}
