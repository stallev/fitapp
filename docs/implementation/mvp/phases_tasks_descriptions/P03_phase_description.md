# P03 — Client: Booking Wizard, Bookings & Reviews

**Тип:** Phase Description  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-23  
**Волна:** W11  
**Зависит от:** [`P02_phase_description.md`](./P02_phase_description.md), [`booking_wizard_spec.md`](../specs/booking_wizard_spec.md), [`booking_lifecycle_contract.md`](../contracts/booking_lifecycle_contract.md), [`schedule_slots_contract.md`](../contracts/schedule_slots_contract.md), [`review_moderation_contract.md`](../contracts/review_moderation_contract.md), client wireframes W10-08…15  
**Связанные документы:** [`P03_tasks.md`](../tasks/P03_tasks.md), [`adr_005_mvp_booking_without_payment.md`](../../../prds/07_governance/adr_005_mvp_booking_without_payment.md)

---

## Purpose

Фаза **P03** — **client contour**: 3-step booking wizard, список/деталь бронирований, отмена, отзыв после `completed`, client profile. Бронирование создаётся в статусе **`pending`** без оплаты (ADR-005).

**Аудитория:** AI-агенты после P02.

---

## Scope / Out of scope

### In scope

| Area | Routes |
|------|--------|
| Booking wizard | `/book/[trainerId]`, `/book/[trainerId]/confirm` (if split) |
| Client hub | `/client/dashboard`, `/client/bookings`, `/client/bookings/[id]` |
| Reviews | `/client/reviews/[bookingId]` |
| Profile | `/client/profile` — settings, sign-out |
| Domain | `createBooking`, `cancelBooking`, slot generation, review submit |

### Out of scope

- Trainer confirm/cancel booking actions (→ **P04** trainer client detail)
- Stripe checkout, Resend email E-06
- Video session `/sessions/[sessionId]/room`
- Complaint/refund filing (partially P05 admin; client entry may stub)

---

## Prerequisites

- P01 + P02 complete
- Approved trainer with services + schedule in seed
- Read: [`booking_lifecycle_contract.md`](../contracts/booking_lifecycle_contract.md), [`schedule_slots_contract.md`](../contracts/schedule_slots_contract.md)

---

## Contracts & specs to read

| Document | Why |
|----------|-----|
| [`booking_wizard_spec.md`](../specs/booking_wizard_spec.md) | Wizard UX steps |
| [`booking_lifecycle_contract.md`](../contracts/booking_lifecycle_contract.md) | Mutations, races |
| [`schedule_slots_contract.md`](../contracts/schedule_slots_contract.md) | `GenerateAvailableSlots` |
| [`review_moderation_contract.md`](../contracts/review_moderation_contract.md) | Client review submit |
| [`client_flow.md`](../../../prds/01_product_scope/user_flows/users_mvp/client_flow.md) | Journeys |

---

## Happy path smoke

1. Client on profile → «Book now» → wizard step 1 service → 2 slot → 3 confirm.
2. Submit → booking `pending` → redirect `/client/bookings/[id]?booked=1` + toast via query pattern.
3. `/client/bookings` — Upcoming tab shows new booking.
4. Cancel booking (>24h rule per contract) → toast + status `cancelled`.
5. Trainer marks completed (P04) → client sees review prompt → `/client/reviews/[bookingId]` → submit review `pending` moderation.

*(Step 5 cross-phase: seed or manual DB update acceptable for P03 smoke if P04 incomplete.)*

---

## Negative path smoke

| Scenario | Expected |
|----------|----------|
| Slot taken between pick and submit | `toast.error`; no double booking ([**FM-002**](../../../prds/02_domain_model/failure_modes_catalog.md)) |
| Book unapproved trainer | Blocked at policy/wizard preload |
| Cancel inside 24h window | Business error + message |
| Review on non-completed booking | Deny |
| Empty bookings list | Empty state + CTA to catalog |

---

## Security smoke

| Check | Expected |
|-------|----------|
| Client A views Client B booking ID | 403 / notFound |
| Guest accesses `/book/[trainerId]` | Redirect login |
| IDOR on `createBooking` trainerId tampering | Policy deny if trainer not bookable |

---

## Concurrency & race check

| Scenario | Expected |
|----------|----------|
| Double submit confirm | One booking; UNIQUE slot constraint ([**FM-002**](../../../prds/02_domain_model/failure_modes_catalog.md)) |
| Parallel slot generation + book | Transaction/isolation per contract |

---

## Definition of done

- [ ] Wizard + bookings list/detail + review form per specs/wireframes
- [ ] All booking transitions via `@pulse/domain` use-cases
- [ ] `(booking)` stripped chrome — no bottom nav
- [ ] Mutation pending UI + toasts on all writes
- [ ] Smoke + race check passed
- [ ] No payment UI

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P03_tasks.md`](../tasks/P03_tasks.md) | Checklist |
| [`P04_phase_description.md`](./P04_phase_description.md) | Trainer contour |
| [`documentation_creation_registry.md`](../../../meta/documentation_creation_registry.md) | W11-05 |

---

## Agent notes

- Redirect toast: query param + client `useSearchParams` — не toast из Server Action перед redirect.
- Slot race UX только в spec; resolution — contract.
- `TrainerProfile.timezone` для отображения слотов клиенту.

---

## Acceptance criteria

- [ ] Happy booking E2E without payment
- [ ] Negative: slot race + cancel window
- [ ] Security: IDOR booking detail
- [ ] FM-002 referenced in implementation comments or tests
