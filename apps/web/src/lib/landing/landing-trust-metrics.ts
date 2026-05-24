import type { StatsBarMetric } from "@/components/ui/StatsBar.client";
import { MESSAGES } from "@/lib/messages";

const LANDING_TRUST_FORMATTERS: Record<
  string,
  (value: number) => React.ReactNode
> = {
  trainers: (value) => `${value}+`,
  sessions: (value) => `${value.toLocaleString("ru-RU")}+`,
  satisfaction: (value) => `${value}%`,
  rating: (value) => `${(value / 10).toFixed(1)}★`,
};

export function getLandingTrustMetrics(): StatsBarMetric[] {
  return MESSAGES.landing.trustBar.metrics.map((metric) => ({
    id: metric.id,
    target: metric.target,
    label: metric.label,
    format: LANDING_TRUST_FORMATTERS[metric.id],
  }));
}
