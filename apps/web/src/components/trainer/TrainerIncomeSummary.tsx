import { PulseCardKpi } from "@/components/ui/PulseCardKpi";
import { CalendarIcon, DollarSignIcon } from "lucide-react";

import type { TrainerIncomeSnapshot } from "@/data/trainer/get-trainer-income.server";
import { MESSAGES } from "@/lib/messages";

export type TrainerIncomeSummaryProps = {
  snapshot: TrainerIncomeSnapshot;
};

export function TrainerIncomeSummary({ snapshot }: TrainerIncomeSummaryProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <PulseCardKpi
        icon={<DollarSignIcon className="size-4" aria-hidden />}
        tone="primary"
        value={snapshot.monthTotalLabel}
        label={MESSAGES.trainer.income.monthTotal}
      />
      <PulseCardKpi
        icon={<CalendarIcon className="size-4" aria-hidden />}
        tone="info"
        value={snapshot.sessionCount}
        label={MESSAGES.trainer.income.sessionCount}
      />
    </div>
  );
}
