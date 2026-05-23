# P02 — Public Discovery: Landing, Catalog & Trainer Profile

**Тип:** Phase Description  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-23  
**Волна:** W11  
**Зависит от:** [`P01_phase_description.md`](./P01_phase_description.md), [`catalog_discovery_spec.md`](../specs/catalog_discovery_spec.md), [`wishlist_contract.md`](../contracts/wishlist_contract.md), wireframes [`public_landing.md`](../../../design/wireframes/mvp/public_landing.md), [`public_trainers_catalog.md`](../../../design/wireframes/mvp/public_trainers_catalog.md), [`public_trainer_profile.md`](../../../design/wireframes/mvp/public_trainer_profile.md)  
**Связанные документы:** [`P02_tasks.md`](../tasks/P02_tasks.md), [`cache_revalidation_policy.md`](../../../prds/05_runtime/cache_revalidation_policy.md)

---

## Purpose

Фаза **P02** реализует **публичную зону discovery**: landing `/`, каталог `/trainers`, профиль тренера `/trainers/[id]`, wishlist toggle для авторизованного клиента. После P02 anonymous и client пользователи могут находить approved тренеров и переходить к booking (wizard — P03).

**Аудитория:** AI-агенты после завершения P01.

---

## Scope / Out of scope

### In scope

| Area | Deliverable |
|------|-------------|
| Landing | Hero, categories, featured trainers, CTAs → catalog |
| Catalog | Filters (URL searchParams), sort, pagination, `TrainerCard` grid |
| Profile | Tabs About / Services / Schedule preview / Reviews; sticky CTA → `/book/[trainerId]` |
| Wishlist | Optimistic heart per [`wishlist_contract.md`](../contracts/wishlist_contract.md) |
| Data | RSC queries — **approved trainers only** (INV-03) |
| Cache | Tags per [`cache_revalidation_policy.md`](../../../prds/05_runtime/cache_revalidation_policy.md) |

### Out of scope

- Booking wizard (`/book/*`) → **P03**
- Trainer onboarding/register wizard → **P04**
- Admin approve (affects listing indirectly) → **P05** (seed approved trainers for dev)
- Payment, email notifications
- Post-MVP geo/map filters

---

## Prerequisites

- **P01 complete** — auth, shell, packages, DB, seed with ≥1 `approved` trainer
- Contracts read: [`wishlist_contract.md`](../contracts/wishlist_contract.md)

---

## Contracts & specs to read

| Document | Why |
|----------|-----|
| [`catalog_discovery_spec.md`](../specs/catalog_discovery_spec.md) | UX + data touchpoints |
| [`wishlist_contract.md`](../contracts/wishlist_contract.md) | Toggle idempotency, optimistic UX |
| [`pages_functional_spec.md`](../../../prds/01_product_scope/pages_functional_spec.md) | Page behavior |
| [`client_flow.md`](../../../prds/01_product_scope/user_flows/users_mvp/client_flow.md) | Discovery journey |
| Wireframes W10-02…04 | Layout regions |

---

## In-scope routes

| Path | MVP content |
|------|-------------|
| `/` | Landing — full wireframe fidelity |
| `/trainers` | Catalog + filters |
| `/trainers/[id]` | Public profile (404 if not approved / not found) |

CTA «Book now» → `/book/[trainerId]`; guest redirect login with `callbackUrl` (page may 404 until P03 — **MAY** stub redirect message).

---

## Happy path smoke

1. Anonymous opens `/` → navigates to `/trainers`.
2. Apply filter (e.g. max price) → URL updates → grid refreshes.
3. Open approved trainer profile → tabs render; schedule preview shows slots label in trainer TZ.
4. Client logged in → toggle wishlist heart → optimistic flip; persists on refresh.
5. Tap «Book now» → `/book/[trainerId]` (login redirect if guest).

---

## Negative path smoke

| Scenario | Expected |
|----------|----------|
| `/trainers/[id]` for `pending` trainer | 404 or «not available» — not in catalog |
| Empty catalog (no approved) | Empty state + CTA ([`ui_states_contract`](../../../design/ui_states_contract.md)) |
| Wishlist toggle error | Rollback + `toast.error` ([**FM-005**](../../../prds/02_domain_model/failure_modes_catalog.md)) |
| Invalid filter params | Ignore/sanitize; no 500 |

---

## Security smoke

| Check | Expected |
|-------|----------|
| Pending trainer ID direct URL | No public PII beyond policy allowlist |
| Wishlist mutation as anonymous | Redirect login or action deny |
| Trainer listing query | Never returns `status != approved` |

---

## Concurrency & race check

| Scenario | Expected |
|----------|----------|
| Double wishlist toggle | Idempotent per contract — final state correct ([**FM-005**](../../../prds/02_domain_model/failure_modes_catalog.md)) |

---

## Definition of done

- [ ] Landing, catalog, profile match wireframes + [`catalog_discovery_spec.md`](../specs/catalog_discovery_spec.md)
- [ ] Approved-only catalog enforced at query layer
- [ ] Wishlist optimistic UI + contract compliance
- [ ] UI states: empty catalog, loading skeletons, profile 404
- [ ] `npm run typecheck` + lint pass
- [ ] Smoke checklist passed
- [ ] Cache tags documented if used

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P02_tasks.md`](../tasks/P02_tasks.md) | Checklist |
| [`P03_phase_description.md`](./P03_phase_description.md) | Next — booking |
| [`documentation_creation_registry.md`](../../../meta/documentation_creation_registry.md) | W11-03 |

---

## Agent notes

- Не реализовывать booking wizard в P02 — только navigation target.
- Фильтры **SHOULD** быть shareable via searchParams.
- Один Primary CTA на экран профиля — «Book now».
- Race resolution wishlist — в contract; spec — только UX rollback.

---

## Acceptance criteria

- [ ] Happy + negative + security smoke documented above pass
- [ ] Wireframe links valid
- [ ] No duplicate route list
