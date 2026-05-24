# P16 — Public Landing v2

**Тип:** Phase Description  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-25  
**Волна:** W22  
**Зависит от:** [`P14_phase_description.md`](./P14_phase_description.md), [`public_landing_spec.md`](../specs/public_landing_spec.md), [`global_shell_spec.md`](../specs/global_shell_spec.md)  
**Связанные документы:** [`P16_tasks.md`](../tasks/P16_tasks.md), wireframe [`public_landing.md`](../../../design/wireframes/mvp/public_landing.md) v2, prototype [`Pulse Landing Page -Standalone-.html`](../../../prototypes/Pulse Landing Page -Standalone-.html)

**Supersedes (visual):** P04 MVP landing — historical phase unchanged; **P16 = full replace** of `apps/web/src/components/landing/*`.

---

## Purpose

Фаза **P16** — пересборка публичного landing `/` в полном соответствии с standalone-прототипом: fixed nav, hero split + float cards, trust bar, how-it-works, specialties, featured trainers, testimonials, for-trainers, FAQ, final CTA, footer.

**Аудитория:** AI-агенты после P14 quality gate (или explicit product sign-off на post–quality-gate marketing rework).

---

## Agent context budget

| # | Document | Why |
|---|----------|-----|
| 1 | [`P16_tasks.md`](../tasks/P16_tasks.md) | Checklist |
| 2 | [`public_landing_spec.md`](../specs/public_landing_spec.md) | Sections, CTA, data, a11y |
| 3 | [`public_landing.md`](../../../design/wireframes/mvp/public_landing.md) v2 | Wireframe W10-02 |
| 4 | [`Pulse Landing Page -Standalone-.html`](../../../prototypes/Pulse Landing Page -Standalone-.html) | Visual source of truth for `/` |
| 5 | [`ui_component_phase_matrix.md`](../ui_component_phase_matrix.md) | P16 row only |
| 6 | [`global_shell_spec.md`](../specs/global_shell_spec.md) | Marketing layout vs AppShell |
| 7 | [`catalog_discovery_spec.md`](../specs/catalog_discovery_spec.md) | Featured trainers query |

**Prototype priority for `/`:** standalone landing HTML **over** `Fitness_Platform_Prototype_v1.html`.

**MUST NOT read** P17+ feature phase docs in the same session.

---

## Scope / Out of scope

### In scope

| Area | Deliverable |
|------|-------------|
| Decommission | **DELETE** all legacy `components/landing/*` from P04 |
| Layout | Full-bleed marketing sections; fixed `LandingNav` with scroll state |
| Static sections | Hero, trust bar, steps, specialties, testimonials, for-trainers, FAQ, final CTA, footer |
| Dynamic | Featured trainers (approved-only; Suspense + skeleton/error/empty) |
| Motion | Scroll-reveal + trust counter animation; `prefers-reduced-motion` guard |
| Copy | `@/lib/messages` namespace `landing.*` (RU product locale) |
| CTAs | Primary → `/trainers`; trainer apply → `/auth/register/trainer`; sign in → `/auth/login` |

### Out of scope

- **Tweaks Panel** from prototype (dev-only demo widget)
- Catalog filters, profile, booking (→ P05–P07)
- Stripe checkout UI, video session UI, subscription billing (post-MVP / PRD guard)
- i18n infrastructure beyond RU messages
- Design Lab showcase imports in product routes

---

## UI Catalog (this phase)

| Action | Component | Route |
|--------|-----------|-------|
| **CREATE** | `LandingNav`, `LandingHero`, `LandingHeroFloatCard`, `LandingTrustBar`, `LandingHowItWorks`, `LandingSpecialtyPills`, `LandingFeaturedTrainers*`, `LandingTestimonials`, `LandingForTrainers`, `LandingFaq`, `LandingFinalCta`, `LandingFooter` | `/` |
| **USE** | `Button`, `CustomLink`, typography atoms, `Skeleton`, `Empty` | `/` |
| **KEEP (evaluate)** | `LandingAuthenticatedRedirect` | `/` — redirect logged-in users per product rule |
| **DELETE** | P04 `LandingHero`, `LandingValueProps`, `LandingCategoryChips`, legacy featured/footer modules | — |
| **MUST NOT** | `TweaksPanel`, `@/components/design-lab/**` | — |

---

## Cross-phase dependencies

| Dependency | Blocker? | Notes |
|------------|----------|-------|
| **P14** complete | Yes (recommended) | Quality gate before marketing rework |
| **P05** seed / approved trainers | No | Fixture OK for featured row |
| **P03** fonts/tokens | Yes | Warm Forest tokens in `globals.css` |
| **P17** complaints | No | Independent |

---

## In-scope routes

| Path | Content |
|------|---------|
| `/` | Full landing v2 |

---

## Happy path smoke

1. Anonymous opens `/` → all static sections render; one `h1` in hero.
2. Primary CTA «Найти тренера» → `/trainers`.
3. «Стать тренером» / «Apply» → `/auth/register/trainer`.
4. Sign In → `/auth/login`.
5. Anchor links `#how`, `#trainers`, `#reviews`, `#faq` scroll smoothly.
6. Featured trainers: approved only; empty state + CTA when none.
7. FAQ accordion: keyboard + `aria-expanded`.
8. Visual check 390px / 768px / 1280px vs standalone prototype.

---

## Negative path smoke

| Scenario | Expected |
|----------|----------|
| No approved trainers | Featured empty + CTA → `/trainers` |
| Featured query error | Section error + retry; hero/static sections remain |
| `prefers-reduced-motion` | No scroll-reveal / counter animation required for comprehension |

---

## Security smoke

| Check | Expected |
|-------|----------|
| Pending trainer in featured query | Excluded (INV-03) |
| Auth-only data on public page | None |

---

## Drift risks & guards

| Risk | Guard |
|------|-------|
| Partial patch on P04 components | **DELETE + CREATE** per tasks §1 |
| Prototype hex in product | Semantic Tailwind tokens only |
| EN copy left in UI | All strings in `@/lib/messages` RU |
| Post-MVP FAQ claims (Stripe/video) | Spec §MVP guardrails — copy aligned to MVP |
| Multiple primary CTAs | One primary per viewport section per design system |

---

## Definition of done

- [ ] All [`P16_tasks.md`](../tasks/P16_tasks.md) checked
- [ ] Legacy landing components removed
- [ ] `public_landing_spec.md` + wireframe v2 satisfied
- [ ] `npm run typecheck` + `npm run lint`
- [ ] Manual smoke paths above

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P04_phase_description.md`](./P04_phase_description.md) | Historical MVP landing |
| [`P05_phase_description.md`](./P05_phase_description.md) | Catalog entry from CTAs |
| [`_migration_P15-P20_renumbering.md`](./_migration_P15-P20_renumbering.md) | W22 renumbering |

---

## Agent notes

- **Одна сессия = P16 only.**
- Open standalone prototype locally side-by-side with `/` at 390px and `md+`.
- Register new L3 patterns on Design Lab **before** duplicating markup on second route.

**Registry:** W22

---

## Acceptance criteria

- [ ] Landing v2 visual parity with standalone prototype (structure + tokens)
- [ ] P04 landing modules fully removed
- [ ] Smoke + typecheck + lint pass
