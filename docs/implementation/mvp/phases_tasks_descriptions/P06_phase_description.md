# P06 — Email Jobs & Idempotent Delivery (Post-MVP Runtime)

**Тип:** Phase Description  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-23  
**Волна:** W11  
**Зависит от:** [`P05_phase_description.md`](./P05_phase_description.md), [`email_notifications_contract.md`](../contracts/email_notifications_contract.md), [`adr_006_idempotent_email_delivery.md`](../../../prds/07_governance/adr_006_idempotent_email_delivery.md), [`email_notifications_matrix.md`](../../../prds/01_product_scope/email_notifications_matrix.md)  
**Связанные документы:** [`P06_tasks.md`](../tasks/P06_tasks.md), [`post_mvp_deferrals.md`](../../../prds/01_product_scope/post_mvp_deferrals.md)

**Context7 verified:** Prisma — job queue patterns via app tables; Resend integration outside Prisma core (`/websites/prisma_io`). Auth.js password reset — Credentials flow extension (`/websites/authjs_dev`).

---

## Purpose

Фаза **P06** включает **post-MVP runtime** транзакционных email: enqueue после domain mutations, Cron/worker execution, idempotency через `job_execution` + `delivery_log`, mapping событий E-01–E-09. **Не начинать P06**, пока P01–P05 MVP не принят и явно не снят deferral в [`post_mvp_deferrals.md`](../../../prds/01_product_scope/post_mvp_deferrals.md).

**Аудитория:** AI-агенты post-MVP release train; ops при настройке Resend/Cron.

---

## Scope / Out of scope

### In scope (when phase unlocked)

| Area | Deliverable |
|------|-------------|
| Enqueue API | `enqueueEmailJob` from mutation success path (async, non-blocking) |
| Worker | Vercel Cron → `/api/jobs/email` or `apps/workers` |
| Idempotency | `idempotency_key` UNIQUE; skip duplicate ([ADR-006](../../../prds/07_governance/adr_006_idempotent_email_delivery.md)) |
| Events | E-01…E-09 per matrix |
| Password reset | Optional: consume `password_reset_token` + E-09 ([`password_reset_spec.md`](../specs/password_reset_spec.md)) |
| Observability | `delivery_log` rows; failed job retry policy |

### Out of scope (remain deferred until separate ADR)

- Stripe-triggered emails
- Marketing digests
- AWS SQS migration
- Full HTML template design system (minimal templates OK)

---

## Prerequisites

- P01–P05 MVP **complete and deployed**
- Product sign-off to enable email row in deferrals table
- `RESEND_API_KEY`, verified domain, Cron secret
- Read: [`email_notifications_contract.md`](../contracts/email_notifications_contract.md), [**FM-020**](../../../prds/02_domain_model/failure_modes_catalog.md)

---

## Contracts & specs to read

| Document | Why |
|----------|-----|
| [`email_notifications_contract.md`](../contracts/email_notifications_contract.md) | Enqueue + worker |
| [`email_notifications_matrix.md`](../../../prds/01_product_scope/email_notifications_matrix.md) | Event mapping |
| [`adr_006_idempotent_email_delivery.md`](../../../prds/07_governance/adr_006_idempotent_email_delivery.md) | Idempotency rules |
| [`password_reset_spec.md`](../specs/password_reset_spec.md) | If shipping reset |
| [`backend_requirements.md`](../../../prds/05_runtime/backend_requirements.md) | Jobs contour |

---

## In-scope routes / endpoints

| Path | Role |
|------|------|
| `/api/jobs/email` (or workers entry) | Cron-authenticated batch send |
| `/auth/forgot-password` (optional) | Post-MVP UI per password_reset_spec |

**MVP guard:** до P06 приложение **MUST NOT** write `job_execution` / `delivery_log` from request path.

---

## Happy path smoke

1. Confirm booking (P03 flow) → enqueue E-03 → `job_execution` row inserted.
2. Cron runs → Resend send → `delivery_log` success.
3. Re-run Cron same window → duplicate skipped (idempotent).
4. (Optional) Password reset request → email E-09 → token consumed on link click.

---

## Negative path smoke

| Scenario | Expected |
|----------|----------|
| Resend API down | Job marked failed; retry per policy; **no** duplicate user-visible send on retry success |
| Invalid recipient | Logged; no unhandled throw in worker |
| Enqueue without committed mutation | **Must not happen** — enqueue after transaction commit |

---

## Security smoke

| Check | Expected |
|-------|----------|
| Public POST `/api/jobs/email` | Cron secret / Vercel auth only |
| Password reset token reuse | Deny second use |
| PII in logs | Redact email body in app logs |

---

## Concurrency & race check

| Scenario | Expected |
|----------|----------|
| Duplicate enqueue same `idempotency_key` | INSERT ON CONFLICT skip ([**FM-011**](../../../prds/02_domain_model/failure_modes_catalog.md)) |
| Cron overlap two regions | At-most-once send per key |
| Mutation rollback after enqueue | **Forbidden** — enqueue only post-commit |

---

## Definition of done

- [ ] Explicit product/ADR unlock documented
- [ ] Enqueue wired for agreed event subset (min: booking confirmed, trainer approved)
- [ ] Worker idempotent; `delivery_log` audit trail
- [ ] No email send in synchronous request path
- [ ] MVP toast UX retained as fallback if send fails
- [ ] W12 guides referenced for deploy ([`cron_jobs_registry.md`](../../../prds/06_operations/cron_jobs_registry.md), [`cron_jobs_setup_guide.md`](../guides/cron_jobs_setup_guide.md))

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P06_tasks.md`](../tasks/P06_tasks.md) | Checklist |
| [`P07_phase_description.md`](./P07_phase_description.md) | Hardening (parallel OK after MVP) |
| [`../../../prds/06_operations/cron_jobs_registry.md`](../../../prds/06_operations/cron_jobs_registry.md) | Job catalog |
| [`../guides/cron_jobs_setup_guide.md`](../guides/cron_jobs_setup_guide.md) | Setup how-to |

---

## Agent notes

- **Default for new agents: skip P06** unless user explicitly enables post-MVP email.
- Tables exist from P01 — P06 adds **writers**, not schema.
- Implements **INV-12** / FM-020 guard removal only after phase unlock.

---

## Acceptance criteria

- [ ] Idempotent enqueue + send demonstrated
- [ ] Cron auth enforced
- [ ] No MVP regression (booking still works without email)
- [ ] FM-011 behavior verified
