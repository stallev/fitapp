# P05 Tasks — Admin Contour

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-23  
**Волна:** W11  
**Зависит от:** [`P05_phase_description.md`](../phases_tasks_descriptions/P05_phase_description.md)  
**Связанные документы:** [`admin_verification_spec.md`](../specs/admin_verification_spec.md), [`complaint_refund_spec.md`](../specs/complaint_refund_spec.md)

---

## Purpose

Чеклист **P05** — admin dashboard, verification, complaints, refunds, review moderation.

---

## 1. Admin dashboard

- [ ] `/admin/dashboard` KPI cards
- [ ] «Needs attention» links with badge counts
- [ ] Empty states when queues clear

## 2. Trainer verification

- [ ] `/admin/trainers` tabs Pending / Approved / Rejected
- [ ] `/admin/trainers/[id]` detail + documents download
- [ ] `ApproveTrainer` / `RejectTrainer` actions
- [ ] Reject reason validation
- [ ] `toast.success` on mutate
- [ ] Revalidate `trainers` cache tag

## 3. Complaints

- [ ] `/admin/complaints` list + tabs
- [ ] `/admin/complaints/[id]` detail
- [ ] `StartComplaintReview`, `CloseComplaint`
- [ ] Client `FileComplaint` from booking detail (if deferred from P03)

## 4. Refunds

- [ ] `/admin/refunds` pending queue
- [ ] Approve/Reject — DB status only ([`post_mvp_deferrals`](../../../prds/01_product_scope/post_mvp_deferrals.md))
- [ ] Client `RequestRefund` entry point

## 5. Review moderation

- [ ] `/admin/reviews` queue
- [ ] Hide / delete per [`review_moderation_contract.md`](../contracts/review_moderation_contract.md)
- [ ] Public profile reflects moderation

## 6. Shell integration

- [ ] Nav badge counts for trainers, complaints, refunds
- [ ] Pending UI on all admin mutations

## 7. Verification

- [ ] `npm run typecheck`
- [ ] `npm run lint -w web`
- [ ] Smoke: approve trainer → visible in `/trainers`
- [ ] Smoke: reject without reason blocked
- [ ] Smoke: trainer → `/admin/dashboard` denied
- [ ] Smoke: refund approve — no Stripe calls
- [ ] MVP route inventory complete vs [`canonical_routes.md`](../../../design/canonical_routes.md)

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P05_phase_description.md`](../phases_tasks_descriptions/P05_phase_description.md) | DoD |
| [`P06_tasks.md`](./P06_tasks.md) | Next (post-MVP) |

**Registry:** [`documentation_creation_registry.md`](../../../meta/documentation_creation_registry.md) — W11-10
