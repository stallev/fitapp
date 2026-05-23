# P10 Tasks — Trainer Onboarding

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 2.0  
**Дата:** 2026-05-23  
**Волна:** W16  
**Зависит от:** [`P10_phase_description.md`](../phases_tasks_descriptions/P10_phase_description.md)  
**Связанные документы:** [`trainer_onboarding_spec.md`](../specs/trainer_onboarding_spec.md)

---

## Purpose

Чеклист **P10** — trainer onboarding wizard only.

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
- [ ] `PhotoSlot`, `FileUploadZone`
- [ ] Pending UI; error toast

## 3. Verification

- [ ] `npm run typecheck`
- [ ] `npm run lint -w web`
- [ ] Smoke: submit → pending status
- [ ] Smoke: missing timezone blocked
- [ ] **MUST NOT** admin approve UI (→ P13)

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P10_phase_description.md`](../phases_tasks_descriptions/P10_phase_description.md) | DoD |
| [`P11_tasks.md`](./P11_tasks.md) | Next — profile & services |

**Registry:** W16
