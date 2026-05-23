# P07 — Hardening, Accessibility & Quality Gate

**Тип:** Phase Description  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-23  
**Волна:** W11  
**Зависит от:** [`P05_phase_description.md`](./P05_phase_description.md), [`accessibility_requirements.md`](../../../design/accessibility_requirements.md), [`ui_states_contract.md`](../../../design/ui_states_contract.md), [`interaction_design_contract.md`](../../../design/interaction_design_contract.md)  
**Связанные документы:** [`P07_tasks.md`](../tasks/P07_tasks.md), [`ai_semantics_a11y_guidelines.md`](../../../guidelines/react/ai_semantics_a11y_guidelines.md)

---

## Purpose

Фаза **P07** — **quality gate** перед production MVP: WCAG 2.1 AA pass по [`accessibility_requirements.md`](../../../design/accessibility_requirements.md), полнота UI states (empty/loading/error/forbidden), performance smoke, doc↔code sync, optional axe/Playwright baseline. Может выполняться **после P05** параллельно с отложенным P06.

**Аудитория:** AI-агенты финального polish; QA checklist.

---

## Scope / Out of scope

### In scope

| Area | Deliverable |
|------|-------------|
| Accessibility | Keyboard nav, focus rings, labels, contrast light/dark, touch 44px |
| UI states audit | Every async region per [`ui_states_contract.md`](../../../design/ui_states_contract.md) |
| Mutation UX | Toast, pending, optimistic rollback audit |
| Performance | Lighthouse smoke on landing, catalog, dashboard |
| Docs sync | Phase DoD doc alignment |
| CI hooks | Optional: axe, typecheck/lint in CI (if repo ready) |

### Out of scope

- Formal VPAT / legal audit
- Full E2E suite for all flows (smoke subset only)
- RTL localization
- P06 email (separate phase)

---

## Prerequisites

- P01–P05 feature-complete
- Wireframes W10 as visual baseline

---

## Contracts & specs to read

| Document | Why |
|----------|-----|
| [`accessibility_requirements.md`](../../../design/accessibility_requirements.md) | A1–A4 rules |
| [`ui_states_contract.md`](../../../design/ui_states_contract.md) | State matrix |
| [`interaction_design_contract.md`](../../../design/interaction_design_contract.md) | Toast/pending |
| [`forms_and_validation_ux.md`](../../../design/forms_and_validation_ux.md) | Form a11y |

---

## Happy path smoke

1. Keyboard-only: login → catalog → book → logout — no traps.
2. Screen reader spot-check: one `h1` per route, labeled nav regions.
3. Theme toggle: contrast still passes A1-MUST-3.
4. All primary flows show loading skeleton then content.

---

## Negative path smoke

| Scenario | Expected |
|----------|----------|
| Network error on catalog | Error state + retry CTA (Zero Dead Ends) |
| 403 forbidden page | Dedicated forbidden UI, not blank |
| Form validation | `aria-invalid` + describedby |

---

## Security smoke

| Check | Expected |
|-------|----------|
| Auth error messages | Generic (A3-MUST-4) |
| No sensitive data in toast copy |

---

## Concurrency & race check

| Scenario | Expected |
|----------|----------|
| Optimistic rollback | Focus returns to control; error announced |

---

## Drift & consistency notes

| Risk | Guard |
|------|-------|
| Docs vs implemented routes | Compare [`canonical_routes.md`](../../../design/canonical_routes.md) vs `apps/web/src/app` |
| Wireframe vs UI | Spot-check 5 key screens |
| Guidelines vs code | `@/lib/messages` — no hardcoded user strings in touched files |

---

## Definition of done

- [ ] Accessibility checklist A1–A4 signed off (manual)
- [ ] UI states matrix gaps closed or documented exceptions
- [ ] Lighthouse: no critical a11y violations on 3 key URLs
- [ ] `npm run typecheck` + lint clean
- [ ] Product docs updated if behavior changed during hardening
- [ ] Known issues list empty or tracked

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P07_tasks.md`](../tasks/P07_tasks.md) | Checklist |
| [`documentation_creation_registry.md`](../../../meta/documentation_creation_registry.md) | W11-13 |
| W14 final index sync | Next documentation wave |

---

## Agent notes

- P07 — **не** feature phase; минимальные diffs, фиксы a11y/states.
- Prefer shadcn/Radix primitives over custom widgets.
- `prefers-reduced-motion` in globals.css.

---

## Acceptance criteria

- [ ] WCAG spot-check documented
- [ ] Forbidden/empty/error states on all P01–P05 routes
- [ ] Doc sync complete
- [ ] No new features / scope creep
