# P15 Tasks — Email & Jobs (Post-MVP)

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 2.0  
**Дата:** 2026-05-23  
**Волна:** W16  
**Зависит от:** [`P15_phase_description.md`](../phases_tasks_descriptions/P15_phase_description.md)  
**Связанные документы:** [`email_notifications_contract.md`](../contracts/email_notifications_contract.md)

---

## Purpose

Чеклист **P15** — post-MVP email runtime. **Execute only after deferral unlock.**

---

## 0. Gate

- [ ] Product sign-off + deferral row in [`post_mvp_deferrals.md`](../../../prds/01_product_scope/post_mvp_deferrals.md)
- [ ] P01–P14 deployed and stable

## 1. Infrastructure

- [ ] `RESEND_API_KEY` + domain verified
- [ ] Cron + job route auth (CRON_SECRET)

## 2. Domain & enqueue

- [ ] `enqueueEmailJob(type, payload, idempotencyKey)`
- [ ] Hooks after mutations per email matrix
- [ ] Enqueue after DB commit only

## 3. Worker

- [ ] Batch send + `delivery_log`
- [ ] Idempotent skip ([FM-011](../../../prds/02_domain_model/failure_modes_catalog.md))
- [ ] Retry/backoff documented

## 4. Templates (minimal)

- [ ] E-03 booking confirmed
- [ ] E-01/E-02 if in scope

## 5. Password reset (optional)

- [ ] [`password_reset_spec.md`](../specs/password_reset_spec.md) + E-09

## 6. Verification

- [ ] `npm run typecheck`
- [ ] Smoke: enqueue on booking confirm
- [ ] Smoke: duplicate cron — one send
- [ ] Smoke: unauthorized job endpoint → 401
- [ ] Dev without `RESEND_API_KEY` — graceful skip

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P15_phase_description.md`](../phases_tasks_descriptions/P15_phase_description.md) | DoD |
| [`cron_jobs_setup_guide.md`](../guides/cron_jobs_setup_guide.md) | Cron setup |

**Registry:** W16
