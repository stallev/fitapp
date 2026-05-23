# P07 Tasks — Hardening & Accessibility

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-23  
**Волна:** W11  
**Зависит от:** [`P07_phase_description.md`](../phases_tasks_descriptions/P07_phase_description.md)  
**Связанные документы:** [`accessibility_requirements.md`](../../../design/accessibility_requirements.md)

---

## Purpose

Чеклист **P07** — a11y, UI states audit, quality gate.

---

## 1. Accessibility pass

- [ ] Keyboard navigation all primary flows
- [ ] Focus visible on interactive elements
- [ ] Touch targets ≥ 44px mobile (nav, icons, toggles)
- [ ] Form labels + `aria-invalid` on errors
- [ ] Light/dark contrast check (A1-MUST-1…3)
- [ ] `prefers-reduced-motion` respected
- [ ] Skip link `#main-content` on authenticated layouts (A2-SHOULD-1)
- [ ] Modals/sheets: focus trap + Esc

## 2. UI states audit

- [ ] Cross-check routes vs [`ui_states_contract.md`](../../../design/ui_states_contract.md)
- [ ] empty | loading | error | forbidden for each async region
- [ ] Zero Dead Ends CTAs on empty/error
- [ ] Forbidden route UI (not raw 403 text)

## 3. Mutation UX audit

- [ ] All mutations: pending + `aria-busy`
- [ ] Success/error toasts per rules
- [ ] Optimistic flows: rollback + `toast.error`

## 4. Copy & semantics

- [ ] User strings from `@/lib/messages`
- [ ] One `h1` per page
- [ ] Landmark structure (`main`, `nav`)

## 5. Performance smoke

- [ ] Lighthouse a11y ≥ 90 on `/`, `/trainers`, `/client/dashboard`
- [ ] No layout shift regressions on shell

## 6. Doc sync

- [ ] Route tree matches [`canonical_routes.md`](../../../design/canonical_routes.md)
- [ ] Update specs if behavior fixed during P07
- [ ] Phase DoD checklists P01–P05 re-verified

## 7. Optional CI

- [ ] axe-core or Playwright smoke script (if user requests)
- [ ] Document manual QA steps in PR

## 8. Final verification

- [ ] `npm run typecheck`
- [ ] `npm run lint -w web`
- [ ] Manual keyboard smoke recorded
- [ ] Known issues = 0 or logged in PR

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P07_phase_description.md`](../phases_tasks_descriptions/P07_phase_description.md) | DoD |

**Registry:** [`documentation_creation_registry.md`](../../../meta/documentation_creation_registry.md) — W11-14
