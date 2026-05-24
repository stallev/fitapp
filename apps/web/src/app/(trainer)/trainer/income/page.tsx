import { DollarSignIcon } from "lucide-react";

import { Heading } from "@/components/atoms";
import { TrainerIncomeSummary } from "@/components/trainer/TrainerIncomeSummary";
import { TrainerIncomeTransactions } from "@/components/trainer/TrainerIncomeTransactions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getTrainerIncomeSnapshot } from "@/data/trainer/get-trainer-income.server";
import { MESSAGES } from "@/lib/messages";

export default async function TrainerIncomePage() {
  const snapshot = await getTrainerIncomeSnapshot();

  return (
    <>
      <Heading as="h1" visualLevel="h3">
        {MESSAGES.trainer.income.title}
      </Heading>
      <Alert className="mt-4">
        <AlertDescription>{MESSAGES.trainer.income.stripeBanner}</AlertDescription>
      </Alert>
      <div className="mt-6 space-y-6">
        <TrainerIncomeSummary snapshot={snapshot} />
        {snapshot.transactions.length === 0 ? (
          <Empty className="border-border bg-card">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <DollarSignIcon aria-hidden />
              </EmptyMedia>
              <EmptyTitle>{MESSAGES.trainer.income.emptyTitle}</EmptyTitle>
              <EmptyDescription>
                {MESSAGES.trainer.income.emptyDescription}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <TrainerIncomeTransactions transactions={snapshot.transactions} />
        )}
      </div>
    </>
  );
}
