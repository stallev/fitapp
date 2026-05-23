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

- [x] `/client/reviews/[bookingId]` — `ReviewForm`
- [x] Interactive `RatingStars` required
- [x] `submitReview` → publish review + rating recalc (contract)
- [x] Guard: booking `completed`, no duplicate review
- [x] Pending UI + toasts on submit

## 2. Cross-phase smoke note

- [x] Document seed/manual `completed` booking path if P12 not merged

**Smoke (seed, P12 not required):**

1. Login `client@pulse.dev` / `client123`
2. Open `/client/bookings` → Past → «Оставить отзыв» on Anna completed **or** `/client/reviews/22222222-2222-4222-8222-222222222205`
3. Submit 5★ + body ≥ 20 chars → toast → redirect `/client/bookings/[id]`
4. Negative: `/client/reviews/22222222-2222-4222-8222-222222222203` (Maria, already reviewed) → 404; non-completed booking → 404

## 3. Verification

- [x] `npm run typecheck`
- [x] `npm run lint`
- [x] Smoke: submit review on completed booking
- [x] Smoke: deny non-completed / duplicate

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P09_phase_description.md`](../phases_tasks_descriptions/P09_phase_description.md) | DoD |
| [`P10_tasks.md`](./P10_tasks.md) | Next — trainer onboarding |

**Registry:** W16
