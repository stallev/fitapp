import Link from "next/link";
import { ArrowRightIcon, CalendarIcon, DollarSignIcon, UsersIcon } from "lucide-react";

import { BenefitRow } from "@/components/ui/BenefitRow";
import { BrandSection } from "@/components/ui/BrandSection";
import { Button } from "@/components/ui/button";
import { DarkStatTile } from "@/components/ui/DarkStatTile";
import { MarketingSectionHeader } from "@/components/ui/MarketingSectionHeader";
import { MESSAGES } from "@/lib/messages";

const BENEFIT_ICONS = [UsersIcon, CalendarIcon, DollarSignIcon] as const;

export function LandingForTrainers() {
  const { forTrainers } = MESSAGES.landing;

  return (
    <BrandSection tone="darkForest">
      <div className="grid items-center gap-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <MarketingSectionHeader
            tone="onDark"
            align="left"
            className="mb-0"
            label={forTrainers.label}
            title={
              <>
                {forTrainers.title}{" "}
                <em className="text-[hsl(var(--color-secondary-light))] not-italic">
                  {forTrainers.titleAccent}
                </em>
              </>
            }
            subtitle={forTrainers.subtitle}
          />
          <div className="mt-9 flex flex-col gap-6">
            {forTrainers.benefits.map((benefit, index) => (
              <BenefitRow
                key={benefit.title}
                tone="onDark"
                icon={BENEFIT_ICONS[index] ?? UsersIcon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
          <Button asChild size="lg" className="mt-9 rounded-full px-9">
            <Link href="/auth/register/trainer">
              {forTrainers.cta}
              <ArrowRightIcon aria-hidden className="size-[18px]" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {forTrainers.stats.map((stat) => (
            <DarkStatTile key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </BrandSection>
  );
}
