# P05 — Admin: Verification, Complaints, Refunds & Review Moderation

**Тип:** Phase Description  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-23  
**Волна:** W11  
**Зависит от:** [`P04_phase_description.md`](./P04_phase_description.md), [`admin_verification_spec.md`](../specs/admin_verification_spec.md), [`complaint_refund_spec.md`](../specs/complaint_refund_spec.md), [`trainer_verification_contract.md`](../contracts/trainer_verification_contract.md), [`review_moderation_contract.md`](../contracts/review_moderation_contract.md), admin wireframes W10-23…29  
**Связанные документы:** [`P05_tasks.md`](../tasks/P05_tasks.md), [`admin_flow.md`](../../../prds/01_product_scope/user_flows/users_mvp/admin_flow.md)

---

## Purpose

Фаза **P05** завершает **MVP feature surface** для роли admin: dashboard KPI, очередь верификации тренеров, жалобы, ручные возвраты (DB-only), модерация отзывов. После P05 все MUST-маршруты из [`mvp_scope.md`](../../../prds/01_product_scope/mvp_scope.md) реализованы.

**Аудитория:** AI-агенты после P04.

---

## Scope / Out of scope

### In scope

| Area | Routes |
|------|--------|
| Dashboard | `/admin/dashboard` — KPI, needs attention |
| Verification | `/admin/trainers`, `/admin/trainers/[id]` |
| Complaints | `/admin/complaints`, `/admin/complaints/[id]` |
| Refunds | `/admin/refunds` |
| Reviews | `/admin/reviews` |
| Client entry | `FileComplaint`, `RequestRefund` from booking detail (if not in P03) |
| Nav badges | Pending counts on admin shell |

### Out of scope

- Stripe refund API ([`post_mvp_deferrals.md`](../../../prds/01_product_scope/post_mvp_deferrals.md))
- Email on approve/reject
- Automated ML moderation
- New admin user management

---

## Prerequisites

- P01–P04 complete
- Seed: pending trainer application, sample complaint/refund/review optional

---

## Contracts & specs to read

| Document | Why |
|----------|-----|
| [`admin_verification_spec.md`](../specs/admin_verification_spec.md) | Queue UX |
| [`complaint_refund_spec.md`](../specs/complaint_refund_spec.md) | Status transitions |
| [`trainer_verification_contract.md`](../contracts/trainer_verification_contract.md) | Approve/reject |
| [`review_moderation_contract.md`](../contracts/review_moderation_contract.md) | Hide/delete |
| [`authorization_matrix.md`](../../../prds/04_authorization_privacy/authorization_matrix.md) | Admin-only |

---

## Happy path smoke

1. Admin login → `/admin/dashboard` — KPI + links.
2. `/admin/trainers` Pending tab → open application → **Approve** → toast → trainer in catalog (revalidate).
3. `/admin/complaints` → open → Start review → Close.
4. `/admin/refunds` → Approve pending request → DB status only.
5. `/admin/reviews` → hide inappropriate review → removed from public profile.

---

## Negative path smoke

| Scenario | Expected |
|----------|----------|
| Reject without reason | Validation block |
| Approve already approved | Idempotent or error per contract |
| Non-admin routes | Proxy deny |
| Empty queues | Empty states |

---

## Security smoke

| Check | Expected |
|-------|----------|
| Client/trainer → `/admin/*` | Denied |
| IDOR complaint/refund IDs | Admin policy only |
| Document download | Policy-gated signed URL |

---

## Concurrency & race check

| Scenario | Expected |
|----------|----------|
| Two admins approve same application | One wins; other idempotent/error ([**FM-004**](../../../prds/02_domain_model/failure_modes_catalog.md) if documented) |
| Approve + catalog cache | Revalidate tag `trainers` |

---

## Definition of done

- [ ] All admin routes + client complaint/refund entry points
- [ ] Badge counts on admin nav
- [ ] Approve triggers catalog visibility (INV-03)
- [ ] Manual refunds — no Stripe SDK
- [ ] MVP feature-complete per `mvp_scope.md`
- [ ] Smoke checklist passed

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P05_tasks.md`](../tasks/P05_tasks.md) | Checklist |
| [`P06_phase_description.md`](./P06_phase_description.md) | Post-MVP email |
| [`documentation_creation_registry.md`](../../../meta/documentation_creation_registry.md) | W11-09 |

---

## Agent notes

- Primary CTA on trainer detail: **Approve**.
- Reject requires `rejectionReason`.
- После approve — cache revalidation for P02 catalog.

---

## Acceptance criteria

- [ ] Admin E2E verification approve
- [ ] Complaint + refund status transitions
- [ ] Review moderation affects public profile
- [ ] 403 for non-admin on `/admin/*`
