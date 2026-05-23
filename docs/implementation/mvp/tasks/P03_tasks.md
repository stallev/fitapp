# P03 Tasks — Client Booking & Reviews

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-23  
**Волна:** W11  
**Зависит от:** [`P03_phase_description.md`](../phases_tasks_descriptions/P03_phase_description.md)  
**Связанные документы:** [`booking_wizard_spec.md`](../specs/booking_wizard_spec.md)

---

## Purpose

Чеклист **P03** — booking wizard, client bookings, reviews, profile.

---

## 1. Domain & contracts

- [ ] `createBooking`, `cancelBooking` in `@pulse/domain`
- [ ] `GenerateAvailableSlots` per [`schedule_slots_contract.md`](../contracts/schedule_slots_contract.md)
- [ ] Policy: `assertCanCreateBooking`, `assertCanViewBooking`, `assertCanCancelBooking`
- [ ] UNIQUE / transaction for slot conflict ([FM-002](../../../prds/02_domain_model/failure_modes_catalog.md))

## 2. Booking wizard `/book/[trainerId]`

- [ ] `(booking)` layout — stripped header
- [ ] Steps: Service → Slot → Confirm
- [ ] `ScheduleGrid` + trainer TZ labels
- [ ] Optional message field (max 500)
- [ ] `createBooking` Server Action — pending status
- [ ] Redirect `?booked=1` + `RedirectToast` client component
- [ ] Pending: `disabled`, `aria-busy` on submit

## 3. Client dashboard & bookings

- [ ] `/client/dashboard` — welcome, next session, shortcuts
- [ ] `/client/bookings` — tabs Upcoming / Past / Cancelled
- [ ] `/client/bookings/[id]` — detail, cancel action, link to review when eligible
- [ ] Cancel confirm dialog + `toast.success` / `toast.error`

## 4. Reviews

- [ ] `/client/reviews/[bookingId]` form per wireframe
- [ ] `submitReview` → status pending moderation
- [ ] Guard: booking `completed`, no duplicate review

## 5. Client profile

- [ ] `/client/profile` — name, email display, sign-out
- [ ] **MUST NOT** password reset email UI (post-MVP)

## 6. Verification

- [ ] `npm run typecheck`
- [ ] `npm run lint -w web`
- [ ] Smoke: full booking happy path
- [ ] Smoke: slot conflict → error toast
- [ ] Smoke: IDOR other user's booking → denied
- [ ] Smoke: empty bookings state
- [ ] No Stripe/Resend code

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P03_phase_description.md`](../phases_tasks_descriptions/P03_phase_description.md) | DoD |
| [`P04_tasks.md`](./P04_tasks.md) | Next |

**Registry:** [`documentation_creation_registry.md`](../../../meta/documentation_creation_registry.md) — W11-06
