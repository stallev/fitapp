import { Heading } from "@/components/atoms";
import { TrainerScheduleEditor } from "@/components/trainer/schedule/TrainerScheduleEditor.client";
import { getTrainerScheduleForEdit } from "@/data/trainer/get-trainer-schedule-for-edit.server";
import { MESSAGES } from "@/lib/messages";

export async function TrainerScheduleEditorSection() {
  const schedule = await getTrainerScheduleForEdit();

  return (
    <>
      <Heading as="h1" visualLevel="h3">
        {MESSAGES.trainer.schedule.title}
      </Heading>
      <TrainerScheduleEditor initialSchedule={schedule} />
    </>
  );
}
