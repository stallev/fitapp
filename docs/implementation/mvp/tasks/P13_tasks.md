# P13 Tasks — Admin Moderation

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 2.0  
**Дата:** 2026-05-23  
**Волна:** W16  
**Зависит от:** [`P13_phase_description.md`](../phases_tasks_descriptions/P13_phase_description.md)  
**Связанные документы:** [`admin_verification_spec.md`](../specs/admin_verification_spec.md), [`complaint_refund_spec.md`](../specs/complaint_refund_spec.md)

---

## Purpose

Чеклист **P13** — admin MVP feature-complete.

---

## 1. Admin dashboard

- [ ] `/admin/dashboard` KPI + needs attention
- [ ] Empty states when queues clear

## 2. Trainer verification

- [ ] `/admin/trainers` tabs Pending / Approved / Rejected
- [ ] `/admin/trainers/[id]` + documents
- [ ] `ModerationQueueRow`
- [ ] Approve / Reject + reject reason validation
- [ ] Revalidate `trainers` cache tag

## 3. Complaints & refunds

- [ ] `/admin/complaints` + detail workflows
- [ ] `/admin/refunds` — DB only, no Stripe
- [ ] Client complaint/refund entry if not in P08

## 4. Review moderation

- [ ] `/admin/reviews` queue
- [ ] Hide/delete per contract

## 5. Shell

- [ ] Nav badge counts
- [ ] Pending UI on all admin mutations

## 6. Verification

- [ ] `npm run typecheck`
- [ ] `npm run lint -w web`
- [ ] Smoke: approve → visible in `/trainers`
- [ ] Smoke: non-admin denied
- [ ] MVP routes vs [`canonical_routes.md`](../../../design/canonical_routes.md)

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P13_phase_description.md`](../phases_tasks_descriptions/P13_phase_description.md) | DoD |
| [`P14_tasks.md`](./P14_tasks.md) | Next — quality gate |

**Registry:** W16
