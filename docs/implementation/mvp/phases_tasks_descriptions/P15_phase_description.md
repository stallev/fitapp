# P15 — Email & Jobs *(Post-MVP Runtime)*

**Тип:** Phase Description  
**Статус:** Canonical  
**Версия:** 2.0  
**Дата:** 2026-05-23  
**Волна:** W16  
**Зависит от:** [`P14_phase_description.md`](./P14_phase_description.md), [`email_notifications_contract.md`](../contracts/email_notifications_contract.md), [`adr_006_idempotent_email_delivery.md`](../../../prds/07_governance/adr_006_idempotent_email_delivery.md)  
**Связанные документы:** [`P15_tasks.md`](../tasks/P15_tasks.md), [`post_mvp_deferrals.md`](../../../prds/01_product_scope/post_mvp_deferrals.md)

**Context7 verified:** Prisma job queue via app tables; Resend outside Prisma core.

---

## Purpose

Фаза **P15** — post-MVP transactional email: enqueue after domain mutations, Cron/worker, idempotency via `job_execution` + `delivery_log`, events E-01–E-09. **Не начинать**, пока P14 не deployed и deferral не снят.

**Аудитория:** AI-агенты post-MVP release train; ops.

---

## Agent context budget

| # | Document | Why |
|---|----------|-----|
| 1 | [`P15_tasks.md`](../tasks/P15_tasks.md) | Checklist |
| 2 | [`email_notifications_contract.md`](../contracts/email_notifications_contract.md) | Enqueue + worker |
| 3 | [`email_notifications_matrix.md`](../../../prds/01_product_scope/email_notifications_matrix.md) | Event mapping |
| 4 | [`adr_006_idempotent_email_delivery.md`](../../../prds/07_governance/adr_006_idempotent_email_delivery.md) | Idempotency |
| 5 | [`cron_jobs_setup_guide.md`](../guides/cron_jobs_setup_guide.md) | Vercel Cron |
| 6 | [`password_reset_spec.md`](../specs/password_reset_spec.md) | Optional reset UI |

**MUST NOT read** feature phase docs unless hooking enqueue points.

---

## Scope / Out of scope

### In scope (when unlocked)

| Area | Deliverable |
|------|-------------|
| Enqueue | `enqueueEmailJob` after mutation success |
| Worker | Cron → `/api/jobs/email` or `apps/workers` |
| Idempotency | `idempotency_key` UNIQUE ([ADR-006](../../../prds/07_governance/adr_006_idempotent_email_delivery.md)) |
| Events | E-01…E-09 per matrix |
| Password reset | Optional E-09 UI |
| Observability | `delivery_log`; retry policy |

### Out of scope

- Stripe-triggered emails
- Marketing digests
- AWS SQS migration

---

## UI Catalog (this phase)

| Action | Component | Route |
|--------|-----------|-------|
| **CREATE (optional)** | Password reset form | `/auth/forgot-password` |
| **MUST NOT** | Other product UI | Backend jobs only |

---

## Cross-phase dependencies

| Dependency | Blocker? | Notes |
|------------|----------|-------|
| **P14** deployed | Yes | Quality gate |
| Product sign-off deferrals | Yes | post_mvp_deferrals row |
| P01–P13 mutations | Yes | Enqueue hooks |

---

## In-scope routes / endpoints

| Path | Role |
|------|------|
| `/api/jobs/email` | Cron-authenticated batch |
| `/auth/forgot-password` | Optional post-MVP |

**MVP guard:** до P15 приложение **MUST NOT** write `job_execution` / `delivery_log` from request path.

---

## Happy path smoke

1. Confirm booking → enqueue E-03 → `job_execution` row.
2. Cron → Resend → `delivery_log` success.
3. Duplicate cron → one send ([**FM-011**](../../../prds/02_domain_model/failure_modes_catalog.md)).

---

## Negative path smoke

| Scenario | Expected |
|----------|----------|
| Resend failure | Retry/backoff; failed status |
| Missing API key | Graceful skip or feature flag in dev |

---

## Security smoke

| Check | Expected |
|-------|----------|
| Unauthorized job endpoint | 401 |
| PII in logs | Redacted |

---

## Concurrency & race check

| Scenario | Expected |
|----------|----------|
| Duplicate idempotency_key | Skip second send |

---

## Drift risks & guards

| Risk | Guard |
|------|-------|
| Enqueue before commit | After transaction only |
| MVP writes job tables early | Feature flag until P15 |
| Email without deferral unlock | Gate §0 in tasks |

---

## Definition of done

- [ ] Enqueue + worker + idempotency per ADR-006
- [ ] Cron secured; delivery_log populated
- [ ] Smoke passed; deferral doc updated
- [ ] `typecheck` pass

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P15_tasks.md`](../tasks/P15_tasks.md) | Checklist |
| [`04_email_jobs_layers.md`](../../../architecture_learning_pack/04_email_jobs_layers.md) | Layer map |

---

## Agent notes

- **Одна сессия = P15 only.**
- Verify MVP works with `RESEND_API_KEY` unset in dev.

---

## Acceptance criteria

- [ ] Enqueue + idempotent delivery smoke pass
- [ ] Product sign-off documented
