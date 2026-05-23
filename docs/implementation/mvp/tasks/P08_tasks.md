# P08 Tasks — Client Bookings Hub

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 2.0  
**Дата:** 2026-05-23  
**Волна:** W16  
**Зависит от:** [`P08_phase_description.md`](../phases_tasks_descriptions/P08_phase_description.md)  
**Связанные документы:** [`booking_lifecycle_contract.md`](../contracts/booking_lifecycle_contract.md)

---

## Purpose

Чеклист **P08** — client dashboard, bookings, profile, cancel.

---

## 1. Domain

- [ ] `cancelBooking` in `@pulse/domain`
- [ ] Policy: `assertCanViewBooking`, `assertCanCancelBooking`

## 2. Client dashboard & bookings

- [ ] `/client/dashboard` — welcome, next session, shortcuts
- [ ] `/client/bookings` — tabs Upcoming / Past / Cancelled
- [ ] `/client/bookings/[id]` — detail, cancel, review link when eligible
- [ ] `BookingListItem` component
- [ ] Cancel confirm dialog + toasts + pending UI

## 3. Client profile

- [ ] `/client/profile` — name, email, sign-out
- [ ] **MUST NOT** password reset email UI (post-MVP)

## 4. Verification

- [ ] `npm run typecheck`
- [ ] `npm run lint -w web`
- [ ] Smoke: cancel happy path
- [ ] Smoke: IDOR other user's booking → denied
- [ ] Smoke: empty bookings state
- [ ] **MUST NOT** review form (→ P09)

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P08_phase_description.md`](../phases_tasks_descriptions/P08_phase_description.md) | DoD |
| [`P09_tasks.md`](./P09_tasks.md) | Next — reviews |

**Registry:** W16
