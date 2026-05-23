# P07 Tasks — Booking Wizard

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 2.0  
**Дата:** 2026-05-23  
**Волна:** W16  
**Зависит от:** [`P07_phase_description.md`](../phases_tasks_descriptions/P07_phase_description.md)  
**Связанные документы:** [`booking_wizard_spec.md`](../specs/booking_wizard_spec.md)

---

## Purpose

Чеклист **P07** — booking wizard only.

---

## 1. Domain & contracts

- [ ] `createBooking` in `@pulse/domain`
- [ ] `GenerateAvailableSlots` per schedule_slots_contract
- [ ] Policy: `assertCanCreateBooking`
- [ ] UNIQUE / transaction for slot conflict ([FM-002](../../../prds/02_domain_model/failure_modes_catalog.md))

## 2. Booking wizard `/book/[trainerId]`

- [ ] `(booking)` layout — stripped header, no bottom nav
- [ ] Steps: Service → Slot → Confirm
- [ ] `BookingWizard` + schedule grid wrapper
- [ ] Trainer TZ labels on slots
- [ ] Optional message field (max 500)
- [ ] `createBooking` — pending status
- [ ] Redirect `?booked=1` + `RedirectToast`
- [ ] Pending: `disabled`, `aria-busy` on submit
- [ ] **MUST NOT** payment UI (ADR-005)

## 3. Verification

- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] Smoke: full booking happy path
- [ ] Smoke: slot conflict → error toast
- [ ] Smoke: guest → login redirect
- [ ] Smoke: double submit → one booking

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P07_phase_description.md`](../phases_tasks_descriptions/P07_phase_description.md) | DoD |
| [`P08_tasks.md`](./P08_tasks.md) | Next — client hub |

**Registry:** W16
