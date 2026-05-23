# P04 — Trainer: Onboarding, Profile, Services, Schedule & Clients

**Тип:** Phase Description  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-23  
**Волна:** W11  
**Зависит от:** [`P03_phase_description.md`](./P03_phase_description.md), [`trainer_onboarding_spec.md`](../specs/trainer_onboarding_spec.md), [`trainer_schedule_spec.md`](../specs/trainer_schedule_spec.md), [`trainer_verification_contract.md`](../contracts/trainer_verification_contract.md), [`schedule_slots_contract.md`](../contracts/schedule_slots_contract.md), [`file_upload_contract.md`](../contracts/file_upload_contract.md), trainer wireframes W10-07, 16–21  
**Связанные документы:** [`P04_tasks.md`](../tasks/P04_tasks.md), [`trainer_flow.md`](../../../prds/01_product_scope/user_flows/users_mvp/trainer_flow.md)

**Context7 verified:** Next.js 16.2 — segment `loading.tsx` for `/trainer/schedule` skeleton (`/vercel/next.js/v16.2.2`).

---

## Purpose

Фаза **P04** — **trainer contour**: регистрация/onboarding wizard, dashboard, редактирование профиля, CRUD услуг, расписание (weekly + exceptions), список клиентов и карточка клиента, income history (без Stripe). После P04 тренер может подать заявку на модерацию и управлять расписанием для client booking (P03).

**Аудитория:** AI-агенты после P03.

---

## Scope / Out of scope

### In scope

| Area | Routes |
|------|--------|
| Onboarding | `/auth/register/trainer` — 5-step wizard |
| Trainer app | `/trainer/dashboard`, `/trainer/profile`, `/trainer/services`, `/trainer/schedule`, `/trainer/clients`, `/trainer/clients/[id]`, `/trainer/income` |
| Uploads | Photo, certificates via Blob contract |
| Schedule | `UpsertWeeklyIntervals`, exceptions |
| Services | CRUD + active toggle (optimistic optional) |
| Booking ops | Mark session completed (enables client review) |

### Out of scope

- Admin approve/reject UI → **P05**
- Stripe payouts `/trainer/payouts`
- Email E-01/E-02 on submit/approve
- Public catalog listing logic (P02) — only side effect when approved

---

## Prerequisites

- P01–P03 complete
- [`trainer_onboarding_spec.md`](../specs/trainer_onboarding_spec.md), [`trainer_schedule_spec.md`](../specs/trainer_schedule_spec.md)

---

## Contracts & specs to read

| Document | Why |
|----------|-----|
| [`trainer_verification_contract.md`](../contracts/trainer_verification_contract.md) | Submit application, statuses |
| [`file_upload_contract.md`](../contracts/file_upload_contract.md) | Blob upload lifecycle |
| [`schedule_slots_contract.md`](../contracts/schedule_slots_contract.md) | Intervals, exceptions, TZ |
| [`privacy_data_handling.md`](../../../prds/04_authorization_privacy/privacy_data_handling.md) | Client notes visibility |
| [`trainer_flow.md`](../../../prds/01_product_scope/user_flows/users_mvp/trainer_flow.md) | Journeys |

---

## Happy path smoke

1. New user → `/auth/register/trainer` → complete 5 steps → submit → `/trainer/dashboard` + «Under review» banner.
2. Admin approves (P05 or seed) → trainer appears in catalog.
3. Trainer edits `/trainer/profile`, adds service on `/trainer/services`, sets schedule on `/trainer/schedule`.
4. Client books slot (P03) → trainer sees client on `/trainer/clients` and detail with private notes auto-save.
5. Trainer marks booking completed → client can review.

---

## Negative path smoke

| Scenario | Expected |
|----------|----------|
| Submit wizard without timezone | Validation error step 1 (INV-01) |
| Invalid interval `end <= start` | Inline error on schedule sheet |
| Upload wrong MIME / size | Error per file contract |
| Pending trainer edits public slug | No public page until approved |
| Service toggle error | `toast.error` + rollback if optimistic |

---

## Security smoke

| Check | Expected |
|-------|----------|
| Trainer A views Trainer B client notes | Deny |
| Client accesses `/trainer/schedule` | Proxy deny |
| Direct Blob URL without policy | Denied/expired |

---

## Concurrency & race check

| Scenario | Expected |
|----------|----------|
| Overlapping schedule save | Last-write or validation per contract |
| Double submit application | Idempotent — one submitted_at |

---

## Definition of done

- [ ] Onboarding wizard + all trainer routes per wireframes
- [ ] `TrainerProfile.timezone` required and displayed on schedule
- [ ] File uploads via Blob contract
- [ ] Complete booking action for trainer
- [ ] Income page — DB snapshot only, no Stripe
- [ ] Smoke checklist passed

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P04_tasks.md`](../tasks/P04_tasks.md) | Checklist |
| [`P05_phase_description.md`](./P05_phase_description.md) | Admin |
| [`documentation_creation_registry.md`](../../../meta/documentation_creation_registry.md) | W11-07 |

---

## Agent notes

- Onboarding **не** смешивать с P01 client register.
- Auto-save trainer notes — debounce + error toast only.
- Banner «Under review» — slot in trainer layout per global shell spec.

---

## Acceptance criteria

- [ ] Onboarding E2E to pending status
- [ ] Schedule + services functional for booking integration
- [ ] Security: cross-trainer client access denied
- [ ] TZ invariant respected
