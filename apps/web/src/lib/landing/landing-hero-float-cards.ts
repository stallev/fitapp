import type { Messages } from "@/lib/messages/types";

export type LandingHeroFloatCardTone = "forest" | "gold" | "slate";

export type LandingHeroFloatCardData = {
  id: string;
  name: string;
  spec: string;
  cert: string;
  rating: string;
  price: string;
  initials: string;
  tone: LandingHeroFloatCardTone;
  /** Tailwind placement — inline `style` is blocked by CSP `style-src` nonce policy. */
  placementClassName: string;
};

type LandingHeroFloatCardSeed = Omit<LandingHeroFloatCardData, "price"> & {
  priceAmount: string;
};

const LANDING_HERO_FLOAT_CARD_SEEDS: LandingHeroFloatCardSeed[] = [
  {
    id: "float-1",
    name: "Maria P.",
    spec: "Cardio & Pilates",
    cert: "NASM-CPT",
    rating: "5.0",
    priceAmount: "$32",
    initials: "MP",
    tone: "forest",
    placementClassName:
      "absolute top-[10px] left-0 z-[1] w-[215px] -rotate-[4.5deg]",
  },
  {
    id: "float-2",
    name: "Anna V.",
    spec: "Stretching",
    cert: "ACE-CPT",
    rating: "4.8",
    priceAmount: "$35",
    initials: "AV",
    tone: "gold",
    placementClassName:
      "absolute top-[90px] left-[150px] z-[3] w-[215px] rotate-[2.5deg]",
  },
  {
    id: "float-3",
    name: "Sergey K.",
    spec: "Strength",
    cert: "NSCA-CSCS",
    rating: "4.9",
    priceAmount: "$48",
    initials: "SK",
    tone: "slate",
    placementClassName:
      "absolute top-[265px] left-[22px] z-[2] w-[215px] -rotate-[1.5deg]",
  },
];

export function getLandingHeroFloatCards(
  messages: Pick<Messages, "landing" | "common">,
): LandingHeroFloatCardData[] {
  const priceTemplate = messages.landing.hero.floatCardPrice;

  return LANDING_HERO_FLOAT_CARD_SEEDS.map(({ priceAmount, ...card }) => ({
    ...card,
    price: `${priceTemplate.replace("{amount}", priceAmount)}${messages.common.perHourSuffix}`,
  }));
}
