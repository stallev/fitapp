# P02 Tasks — Public Discovery

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-23  
**Волна:** W11  
**Зависит от:** [`P02_phase_description.md`](../phases_tasks_descriptions/P02_phase_description.md)  
**Связанные документы:** [`catalog_discovery_spec.md`](../specs/catalog_discovery_spec.md)

---

## Purpose

Чеклист **P02** — landing, catalog, trainer profile, wishlist.

---

## 1. Landing `/`

- [ ] Hero, value props, category chips per wireframe
- [ ] Featured trainers section (approved only)
- [ ] Primary CTA → `/trainers`
- [ ] Responsive: mobile-first layout
- [ ] `loading.tsx` skeleton where async

## 2. Catalog `/trainers`

- [ ] RSC loader: approved trainers + aggregates
- [ ] Filters: `q`, `maxPrice`, `minRating`, `specializations[]` in URL
- [ ] Mobile: filter Sheet; desktop: sidebar `lg:`
- [ ] Sort + pagination
- [ ] `TrainerCard` component (one per file rule)
- [ ] Empty state when no results

## 3. Profile `/trainers/[id]`

- [ ] 404 for non-approved / missing
- [ ] Tabs: About, Services, Schedule preview, Reviews
- [ ] Sticky CTA mobile / sidebar card desktop
- [ ] Schedule preview uses trainer timezone label
- [ ] Reviews list (approved reviews only)

## 4. Wishlist

- [ ] `toggleWishlist` Server Action per [`wishlist_contract.md`](../contracts/wishlist_contract.md)
- [ ] `useOptimistic` + `useTransition` on heart control
- [ ] `toast.error` on failure; success toast optional
- [ ] Guest: redirect login on tap

## 5. Data & cache

- [ ] Query filters `trainer_profile.status = approved`
- [ ] Cache tag `trainers` if using `unstable_cache` / tags policy
- [ ] Revalidate hooks stub for P05 admin approve

## 6. Verification

- [ ] `npm run typecheck`
- [ ] `npm run lint -w web`
- [ ] Smoke: catalog filter URL shareable
- [ ] Smoke: pending trainer not in list / 404 on direct URL
- [ ] Smoke: wishlist toggle + error rollback
- [ ] Smoke: guest book CTA → login redirect

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P02_phase_description.md`](../phases_tasks_descriptions/P02_phase_description.md) | Phase DoD |
| [`P03_tasks.md`](./P03_tasks.md) | Next phase |

**Registry:** [`documentation_creation_registry.md`](../../../meta/documentation_creation_registry.md) — W11-04
