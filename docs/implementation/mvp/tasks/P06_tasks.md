# P06 Tasks — Trainer Public Profile + Wishlist

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 2.0  
**Дата:** 2026-05-23  
**Волна:** W16  
**Зависит от:** [`P06_phase_description.md`](../phases_tasks_descriptions/P06_phase_description.md)  
**Связанные документы:** [`wishlist_contract.md`](../contracts/wishlist_contract.md)

---

## Purpose

Чеклист **P06** — profile `/trainers/[id]` + wishlist.

---

## 1. Profile `/trainers/[id]`

- [ ] 404 for non-approved / missing
- [ ] Tabs: About, Services, Schedule preview, Reviews
- [ ] Sticky CTA mobile / sidebar card desktop
- [ ] Schedule preview — trainer timezone label
- [ ] Reviews list (approved only)
- [ ] Primary CTA «Book now» → `/book/[trainerId]`

## 2. Wishlist

- [ ] `toggleWishlist` Server Action per [`wishlist_contract.md`](../contracts/wishlist_contract.md)
- [ ] `useOptimistic` + `useTransition` on heart
- [ ] `toast.error` on failure
- [ ] Guest: redirect login on tap

## 3. Verification

- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] Smoke: wishlist toggle + rollback
- [ ] Smoke: pending trainer 404
- [ ] **MUST NOT** booking wizard (→ P07)

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P06_phase_description.md`](../phases_tasks_descriptions/P06_phase_description.md) | DoD |
| [`P07_tasks.md`](./P07_tasks.md) | Next — booking |

**Registry:** W16
