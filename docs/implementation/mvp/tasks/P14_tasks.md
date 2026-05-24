# P14 Tasks — Quality Gate

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 2.0  
**Дата:** 2026-05-23  
**Волна:** W16  
**Зависит от:** [`P14_phase_description.md`](../phases_tasks_descriptions/P14_phase_description.md)  
**Связанные документы:** [`accessibility_requirements.md`](../../../design/accessibility_requirements.md)

---

## Purpose

Чеклист **P14** — a11y, UI states, quality gate. **No new features.**

---

## 1. Accessibility

- [ ] Keyboard navigation primary flows
- [ ] Focus visible; touch ≥ 44px
- [ ] Form labels + `aria-invalid`
- [ ] Light/dark contrast (A1-MUST-1…3)
- [ ] Skip link `#main-content`
- [ ] Modals/sheets: focus trap + Esc

## 2. UI states audit

- [ ] Routes vs [`ui_states_contract.md`](../../../design/ui_states_contract.md)
- [ ] empty | loading | error | forbidden per async region
- [ ] Forbidden route UI
- [x] Admin UI parity: `/admin/dashboard`, `/admin/complaints`, `/admin/refunds`, `/admin/reviews` — `loading.tsx`/`error.tsx`, shared queue components (P14 implementation)
- [x] Admin trainer detail parity: `/admin/trainers/[id]` — profile card, documents, sticky decision bar, processed/incomplete states
- [x] Admin complaint detail parity: `/admin/complaints/[id]` — detail card, sticky actions, close confirm, processed banners

## 3. Mutation UX audit

- [ ] Pending + `aria-busy` on all mutations
- [ ] Toasts per rules; optimistic rollback + `toast.error`

## 4. Performance & docs

- [ ] Lighthouse a11y ≥ 90 on `/`, `/trainers`, `/client/dashboard`
- [ ] Route tree vs [`canonical_routes.md`](../../../design/canonical_routes.md)
- [ ] Re-verify P01–P13 DoD

## 5. Verification

- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] Manual keyboard smoke recorded

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P14_phase_description.md`](../phases_tasks_descriptions/P14_phase_description.md) | DoD |
| [`P15_tasks.md`](./P15_tasks.md) | Post-MVP email |

**Registry:** W16
