import type { CSSProperties } from "react";

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
  style: CSSProperties;
};

export const LANDING_HERO_FLOAT_CARDS: LandingHeroFloatCardData[] = [
  {
    id: "float-1",
    name: "Maria P.",
    spec: "Yoga & Pilates",
    cert: "NASM-CPT",
    rating: "5.0",
    price: "от $32/ч",
    initials: "MP",
    tone: "forest",
    style: {
      position: "absolute",
      top: "10px",
      left: "0px",
      transform: "rotate(-4.5deg)",
      zIndex: 1,
      width: "215px",
    },
  },
  {
    id: "float-2",
    name: "Anna V.",
    spec: "Stretching",
    cert: "ACE-CPT",
    rating: "4.8",
    price: "от $35/ч",
    initials: "AV",
    tone: "gold",
    style: {
      position: "absolute",
      top: "90px",
      left: "150px",
      transform: "rotate(2.5deg)",
      zIndex: 3,
      width: "215px",
    },
  },
  {
    id: "float-3",
    name: "Sergey K.",
    spec: "Strength",
    cert: "NSCA-CSCS",
    rating: "4.9",
    price: "от $48/ч",
    initials: "SK",
    tone: "slate",
    style: {
      position: "absolute",
      top: "265px",
      left: "22px",
      transform: "rotate(-1.5deg)",
      zIndex: 2,
      width: "215px",
    },
  },
];
