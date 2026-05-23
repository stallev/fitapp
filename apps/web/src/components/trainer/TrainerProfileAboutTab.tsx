import { ContentText, SectionTitle } from "@/components/atoms";
import { PulseCard } from "@/components/ui/card";
import { SpecChip } from "@/components/ui/SpecChip";
import type { PublicTrainerProfile } from "@/lib/trainer/trainer-profile";
import { MESSAGES } from "@/lib/messages";

export type TrainerProfileAboutTabProps = {
  profile: PublicTrainerProfile;
};

export function TrainerProfileAboutTab({ profile }: TrainerProfileAboutTabProps) {
  return (
    <div className="space-y-4">
      <PulseCard className="p-4 md:p-6">
        <ContentText as="p">
          {profile.bio?.trim() || MESSAGES.trainer.profile.aboutEmptyBio}
        </ContentText>
      </PulseCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <PulseCard className="min-w-0 p-4 md:p-6">
          <SectionTitle as="h3">{MESSAGES.trainer.profile.categoriesTitle}</SectionTitle>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {profile.specializations.map((spec) => (
              <SpecChip key={spec.slug}>{spec.name}</SpecChip>
            ))}
          </div>
        </PulseCard>

        <PulseCard className="min-w-0 p-4 md:p-6">
          <SectionTitle as="h3">{MESSAGES.trainer.profile.certificatesTitle}</SectionTitle>
          {profile.certificates.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {profile.certificates.map((certificate) => (
                <li key={certificate.id}>
                  <ContentText as="span">{certificate.title}</ContentText>
                </li>
              ))}
            </ul>
          ) : (
            <ContentText variant="muted" as="p" className="mt-3">
              {MESSAGES.trainer.profile.aboutEmptyBio}
            </ContentText>
          )}
        </PulseCard>
      </div>
    </div>
  );
}
