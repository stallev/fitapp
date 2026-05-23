# P06 Tasks — Email Jobs (Post-MVP)

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-23  
**Волна:** W11  
**Зависит от:** [`P06_phase_description.md`](../phases_tasks_descriptions/P06_phase_description.md)  
**Связанные документы:** [`email_notifications_contract.md`](../contracts/email_notifications_contract.md)

---

## Purpose

Чеклист **P06** — post-MVP email runtime. **Выполнять только после unlock deferral.**

---

## 0. Gate

- [ ] Product sign-off + deferral row updated in [`post_mvp_deferrals.md`](../../../prds/01_product_scope/post_mvp_deferrals.md)
- [ ] P01–P05 deployed and stable

## 1. Infrastructure

- [ ] `RESEND_API_KEY` + domain verified (Vercel env)
- [ ] Cron schedule configured (Vercel Cron)
- [ ] Job route auth (CRON_SECRET or platform header)

## 2. Domain & enqueue

- [ ] `enqueueEmailJob(type, payload, idempotencyKey)` in `@pulse/domain` or dedicated module
- [ ] Hook after: booking confirm, trainer approve/reject, reminder triggers (per matrix)
- [ ] Enqueue **after** DB transaction commit only

## 3. Worker

- [ ] Fetch pending `job_execution` rows
- [ ] Resend send + update status
- [ ] Write `delivery_log` per attempt
- [ ] Idempotent skip on duplicate key ([FM-011](../../../prds/02_domain_model/failure_modes_catalog.md))
- [ ] Retry/backoff policy documented

## 4. Templates (minimal)

- [ ] E-03 booking confirmed
- [ ] E-01/E-02 trainer application (if in scope)
- [ ] Plain-text + HTML baseline

## 5. Password reset (optional)

- [ ] [`password_reset_spec.md`](../specs/password_reset_spec.md) UI + E-09
- [ ] Token single-use

## 6. Verification

- [ ] `npm run typecheck`
- [ ] Smoke: enqueue on booking confirm
- [ ] Smoke: duplicate cron run — one delivery_log send
- [ ] Smoke: unauthorized job endpoint → 401
- [ ] Confirm MVP works with `RESEND_API_KEY` unset (dev) — graceful skip or feature flag

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P06_phase_description.md`](../phases_tasks_descriptions/P06_phase_description.md) | DoD |
| [`P07_tasks.md`](./P07_tasks.md) | Hardening |

**Registry:** [`documentation_creation_registry.md`](../../../meta/documentation_creation_registry.md) — W11-12
