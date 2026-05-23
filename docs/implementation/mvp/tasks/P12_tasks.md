# P12 Tasks — Trainer Schedule & Clients

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 2.0  
**Дата:** 2026-05-23  
**Волна:** W16  
**Зависит от:** [`P12_phase_description.md`](../phases_tasks_descriptions/P12_phase_description.md)  
**Связанные документы:** [`trainer_schedule_spec.md`](../specs/trainer_schedule_spec.md)

---

## Purpose

Чеклист **P12** — schedule, clients, income, mark completed.

---

## 1. Schedule `/trainer/schedule`

- [ ] Tabs Regular | Exceptions
- [ ] Weekly intervals + day toggles
- [ ] Exception calendar + block dates
- [ ] TZ display from profile
- [ ] `loading.tsx` skeleton
- [ ] Save actions per contract

## 2. Clients & income

- [ ] `/trainer/clients` — `ClientListCard`, search
- [ ] `/trainer/clients/[id]` — history, private notes auto-save
- [ ] `/trainer/income` — DB snapshot, no Stripe
- [ ] `/trainer/dashboard` KPI cards

## 3. Booking completion

- [ ] Mark booking `completed` use-case
- [ ] Policy: trainer owns booking
- [ ] Enables P09 review smoke

## 4. Verification

- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] Smoke: schedule save + invalid interval
- [ ] Smoke: cross-trainer client denied
- [ ] Smoke: complete booking → review eligible

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P12_phase_description.md`](../phases_tasks_descriptions/P12_phase_description.md) | DoD |
| [`P13_tasks.md`](./P13_tasks.md) | Next — admin |

**Registry:** W16
