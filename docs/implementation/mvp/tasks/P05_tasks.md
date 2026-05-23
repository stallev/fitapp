# P05 Tasks — Catalog Discovery

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 2.0  
**Дата:** 2026-05-23  
**Волна:** W16  
**Зависит от:** [`P05_phase_description.md`](../phases_tasks_descriptions/P05_phase_description.md)  
**Связанные документы:** [`catalog_discovery_spec.md`](../specs/catalog_discovery_spec.md)

---

## Purpose

Чеклист **P05** — catalog `/trainers` only.

---

## 1. Catalog `/trainers`

- [ ] RSC loader: approved trainers + aggregates
- [ ] Filters: `q`, `maxPrice`, `minRating`, `specializations[]` in URL
- [ ] Mobile: filter Sheet; desktop: sidebar `lg:`
- [ ] Sort + pagination
- [ ] `TrainerCard` component
- [ ] Empty state when no results
- [ ] Cache tag `trainers` if using tags policy

## 2. Verification

- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] Smoke: filter URL shareable
- [ ] Smoke: pending trainer not in list
- [ ] Smoke: invalid params — no 500
- [ ] **MUST NOT** implement profile or wishlist (→ P06)

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P05_phase_description.md`](../phases_tasks_descriptions/P05_phase_description.md) | DoD |
| [`P06_tasks.md`](./P06_tasks.md) | Next — profile |

**Registry:** W16
