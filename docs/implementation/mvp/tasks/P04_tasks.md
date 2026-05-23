# P04 Tasks — Trainer Contour

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-23  
**Волна:** W11  
**Зависит от:** [`P04_phase_description.md`](../phases_tasks_descriptions/P04_phase_description.md)  
**Связанные документы:** [`trainer_onboarding_spec.md`](../specs/trainer_onboarding_spec.md), [`trainer_schedule_spec.md`](../specs/trainer_schedule_spec.md)

---

## Purpose

Чеклист **P04** — trainer onboarding, profile, services, schedule, clients, income.

---

## 1. Onboarding `/auth/register/trainer`

- [ ] 5-step wizard with progress bar
- [ ] Step 1: photo, city, **timezone** (required)
- [ ] Steps 2–4: bio, certs + upload, services (skip allowed)
- [ ] Step 5: preview + terms + `SubmitTrainerApplication`
- [ ] Per-step save Server Actions
- [ ] Redirect dashboard + review banner

## 2. File uploads

- [ ] Blob upload per [`file_upload_contract.md`](../contracts/file_upload_contract.md)
- [ ] Types: profile photo, certificate, verification_doc
- [ ] Pending UI on upload; error toast

## 3. Trainer profile & services

- [ ] `/trainer/profile` edit approved/pending fields
- [ ] `/trainer/services` CRUD + active/hidden toggle
- [ ] Optimistic toggle optional; `toast.error` on fail

## 4. Schedule `/trainer/schedule`

- [ ] Tabs Regular | Exceptions
- [ ] Weekly intervals editor + day toggles
- [ ] Exception calendar + block dates
- [ ] TZ display line from profile
- [ ] `loading.tsx` skeleton
- [ ] `saveWeeklySchedule` / exception actions

## 5. Clients & income

- [ ] `/trainer/clients` list + search
- [ ] `/trainer/clients/[id]` — booking history, private notes auto-save
- [ ] `/trainer/income` — history table, no Stripe
- [ ] `/trainer/dashboard` KPI cards

## 6. Booking completion

- [ ] Action to mark booking `completed` (domain use-case)
- [ ] Policy: trainer owns booking

## 7. Verification

- [ ] `npm run typecheck`
- [ ] `npm run lint -w web`
- [ ] Smoke: onboarding submit → pending
- [ ] Smoke: schedule save + invalid interval error
- [ ] Smoke: cross-trainer client detail denied
- [ ] Smoke: complete booking → enables review (with P03)

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P04_phase_description.md`](../phases_tasks_descriptions/P04_phase_description.md) | DoD |
| [`P05_tasks.md`](./P05_tasks.md) | Next |

**Registry:** [`documentation_creation_registry.md`](../../../meta/documentation_creation_registry.md) — W11-08
