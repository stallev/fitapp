# P16 Tasks — Public Landing v2

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-25  
**Волна:** W22  
**Зависит от:** [`P16_phase_description.md`](../phases_tasks_descriptions/P16_phase_description.md)  
**Связанные документы:** [`public_landing_spec.md`](../specs/public_landing_spec.md), [`Pulse Landing Page -Standalone-.html`](../../../prototypes/Pulse Landing Page -Standalone-.html)

---

## Purpose

Чеклист **P16** — full replace публичного landing `/` по standalone-прототипу.

---

## 0. Gate

- [ ] P14 DoD complete **or** product sign-off on post–quality-gate landing rework
- [ ] [`public_landing_spec.md`](../specs/public_landing_spec.md) + wireframe v2 reviewed
- [ ] Standalone prototype available at `docs/prototypes/Pulse Landing Page -Standalone-.html`

## 1. Decommission (DELETE)

- [ ] Remove `apps/web/src/components/landing/LandingHero.tsx`
- [ ] Remove `apps/web/src/components/landing/LandingValueProps.tsx`
- [ ] Remove `apps/web/src/components/landing/LandingCategoryChips.tsx`
- [ ] Remove `apps/web/src/components/landing/LandingFeaturedTrainers.server.tsx`
- [ ] Remove `apps/web/src/components/landing/LandingFeaturedTrainersEmpty.tsx`
- [ ] Remove `apps/web/src/components/landing/LandingFeaturedTrainersError.tsx`
- [ ] Remove `apps/web/src/components/landing/FeaturedTrainersSkeleton.tsx`
- [ ] Remove `apps/web/src/components/landing/FeaturedTrainersRetryButton.client.tsx`
- [ ] Remove `apps/web/src/components/landing/SiteFooter.tsx`
- [ ] Evaluate `LandingAuthenticatedRedirect.server.tsx` — keep or relocate per spec
- [ ] Rewrite `(marketing)/page.tsx` composition (no P04 section imports)

## 2. Layout & shell

- [ ] Marketing layout: fixed nav, full-bleed sections where prototype uses full width
- [ ] `LandingNav` — scroll backdrop (`scrolled` state), desktop anchor links, auth CTAs
- [ ] Mobile: hide inline nav links `< md`; preserve Sign In + Get Started
- [ ] `prefers-reduced-motion`: disable reveal/counter animations

## 3. Static sections (CREATE)

- [ ] `LandingHero` + `LandingHeroFloatCard` (split variant; hide visual `< lg` per prototype)
- [ ] `LandingTrustBar` — animated counters (static MVP stats OK)
- [ ] `LandingHowItWorks` — 3 step cards, `#how`
- [ ] `LandingSpecialtyPills` — discipline pills → `/trainers` (query param optional)
- [ ] `LandingTestimonials` — static MVP content
- [ ] `LandingForTrainers` — dark section + benefits + stat grid
- [ ] `LandingFaq` — accordion (`button`, `aria-expanded`), `#faq`
- [ ] `LandingFinalCta` — forest background, dual CTAs
- [ ] `LandingFooter` — logo, links, copyright

## 4. Dynamic section

- [ ] `LandingFeaturedTrainers` server component + Suspense
- [ ] Skeleton / error / empty states for featured grid only
- [ ] Approved trainers only; link card → `/trainers/[id]`
- [ ] «Browse all» → `/trainers`

## 5. Hooks & client boundaries

- [ ] `use-landing-scroll-reveal.ts` or equivalent (client-only)
- [ ] Trust bar counter hook with IntersectionObserver
- [ ] FAQ state client component; ≤140 lines/file — split siblings

## 6. Tokens, catalog & messages

- [ ] Semantic tokens only (`globals.css` / Tailwind v4) — no prototype hex in product
- [ ] `landing.*` namespace in `@/lib/messages` (RU)
- [ ] Lucide icons per **ui-icons-lucide** (no inline SVG duplication)
- [ ] (SHOULD) Design Lab L3 sections for reusable marketing patterns

## 7. Verification

- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] Smoke: all CTAs and anchor links
- [ ] Smoke: featured empty/error paths
- [ ] Visual: 390px, 768px, 1280px vs prototype
- [ ] A11y: one `h1`, FAQ keyboard, focus visible
- [ ] **MUST NOT** ship Tweaks Panel to production

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P16_phase_description.md`](../phases_tasks_descriptions/P16_phase_description.md) | DoD |
| [`ui_component_phase_matrix.md`](../ui_component_phase_matrix.md) | P16 row |
| [`P04_tasks.md`](./P04_tasks.md) | Historical — superseded |

**Registry:** W22
