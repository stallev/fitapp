# P09 Tasks — Client Reviews

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 2.0  
**Дата:** 2026-05-23  
**Волна:** W16  
**Зависит от:** [`P09_phase_description.md`](../phases_tasks_descriptions/P09_phase_description.md)  
**Связанные документы:** [`review_moderation_contract.md`](../contracts/review_moderation_contract.md)

---

## Purpose

Чеклист **P09** — review form `/client/reviews/[bookingId]`.

---

## 1. Reviews

- [ ] `/client/reviews/[bookingId]` — `ReviewForm`
- [ ] Interactive `RatingStars` required
- [ ] `submitReview` → pending moderation
- [ ] Guard: booking `completed`, no duplicate review
- [ ] Pending UI + toasts on submit

## 2. Cross-phase smoke note

- [ ] Document seed/manual `completed` booking path if P12 not merged

## 3. Verification

- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] Smoke: submit review on completed booking
- [ ] Smoke: deny non-completed / duplicate

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P09_phase_description.md`](../phases_tasks_descriptions/P09_phase_description.md) | DoD |
| [`P10_tasks.md`](./P10_tasks.md) | Next — trainer onboarding |

**Registry:** W16
