# P01 Tasks — Monorepo & Data Layer

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 2.0  
**Дата:** 2026-05-23  
**Волна:** W16  
**Зависит от:** [`P01_phase_description.md`](../phases_tasks_descriptions/P01_phase_description.md)  
**Связанные документы:** [`monorepo_boundaries_contract.md`](../contracts/monorepo_boundaries_contract.md), [`database_schema_v1.md`](../../../prds/03_data_model/database_schema_v1.md)

---

## Purpose

Чеклист **P01** — workspaces, `@pulse/domain`, `@pulse/db`, migrate, seed skeleton. **Без** auth UI и shell.

---

## 1. Monorepo & packages

- [ ] Root `package.json` workspaces: `apps/*`, `packages/*`
- [ ] `@pulse/domain` — `UserRole`, `BookingStatus`, `MutationResult`, minimal Zod DTOs
- [ ] `@pulse/db` — Prisma schema, client export, `directUrl` config
- [ ] ESLint/tsconfig paths: `@pulse/*` aliases

## 2. Database

- [ ] Prisma schema matches [`database_schema_v1.md`](../../../prds/03_data_model/database_schema_v1.md)
- [ ] `DATABASE_URL` (pooled) + `DIRECT_URL` in `.env.example`
- [ ] Initial migration applied locally
- [ ] Seed script: admin + client + pending trainer ([`seed_data_spec.md`](../../../prds/03_data_model/seed_data_spec.md))
- [ ] Post-MVP columns present but **unused** in app code

## 3. Verification

- [ ] `npm run typecheck` (root)
- [ ] Seed runs without duplicate email error ([FM-001](../../../prds/02_domain_model/failure_modes_catalog.md))
- [ ] **MUST NOT** add Auth.js, proxy, or product routes in this PR

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P01_phase_description.md`](../phases_tasks_descriptions/P01_phase_description.md) | DoD |
| [`P02_tasks.md`](./P02_tasks.md) | Next — auth |

**Registry:** [`documentation_creation_registry.md`](../../../meta/documentation_creation_registry.md) — W16
