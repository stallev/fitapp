# P01 — Monorepo Scaffold, Database, Auth & Global Shell

**Тип:** Phase Description  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-23  
**Волна:** W11  
**Зависит от:** [`monorepo_boundaries_contract.md`](../contracts/monorepo_boundaries_contract.md), [`authorization_policy_contract.md`](../contracts/authorization_policy_contract.md), [`monorepo_packages.md`](../../../prds/05_runtime/monorepo_packages.md), [`global_shell_spec.md`](../specs/global_shell_spec.md), [`auth_runtime_spec.md`](../../../prds/05_runtime/auth_runtime_spec.md)  
**Связанные документы:** [`P01_tasks.md`](../tasks/P01_tasks.md), [`database_schema_v1.md`](../../../prds/03_data_model/database_schema_v1.md), [`adr_002_next162_vercel_runtime_policy.md`](../../../prds/07_governance/adr_002_next162_vercel_runtime_policy.md)

**Context7 verified:** Next.js 16.2 — `proxy.ts` export `function proxy(request: NextRequest)`; `cookies()` / `headers()` async in App Router (`/vercel/next.js/v16.2.2`). Auth.js — Credentials `authorize`, JWT `role` in `jwt`/`session` callbacks (`/websites/authjs_dev`). Prisma — `DATABASE_URL` (pooled) + `DIRECT_URL` (CLI/migrations) (`/websites/prisma_io`).

---

## Purpose

Фаза **P01** — технический фундамент Pulse MVP: monorepo workspaces, Prisma schema + migrate, Auth.js Credentials + RBAC, `proxy.ts` guards, глобальный app shell (layouts, nav, theme, toast). После P01 приложение деплоится на Vercel с рабочей auth и role-aware shell; feature-экраны — placeholders или минимальные empty states.

**Аудитория:** AI-агенты первой implementation-сессии; tech lead при review scaffold PR.

---

## Scope / Out of scope

### In scope

| Area | Deliverable |
|------|-------------|
| Monorepo | Root workspaces; `@pulse/domain`, `@pulse/db`, `@pulse/policy-edge`, `@pulse/policy-server`; import graph per contract |
| Database | Prisma schema v1, initial migration, seed script skeleton |
| Auth | Auth.js v5 Credentials, JWT session, `role` in token, login + client register |
| Request interception | `apps/web/src/proxy.ts` — JWT-only role/path checks via `@pulse/policy-edge` |
| Global shell | Route groups, `AppShell`, TopBar, BottomNav, SidebarNav, providers ([`global_shell_spec.md`](../specs/global_shell_spec.md)) |
| Dev UX | `@/lib/messages`, `product-toast.ts`, Warm Forest tokens in `globals.css`, shadcn baseline |
| Placeholder routes | Role dashboards with empty states; protected segments wired |

### Out of scope

- Каталог, профиль тренера, booking wizard (→ **P02**, **P03**)
- Trainer multi-step onboarding `/auth/register/trainer` (→ **P04**)
- Domain booking/schedule mutations beyond auth/register (→ **P03**–**P04**)
- Admin moderation UI (→ **P05**)
- Resend, Cron, Stripe, Daily.co ([`post_mvp_deferrals.md`](../../../prds/01_product_scope/post_mvp_deferrals.md))
- Password reset email flow ([`password_reset_spec.md`](../specs/password_reset_spec.md) — post-MVP)

---

## Prerequisites

- Документация W1–W10 complete (contracts, specs, wireframes)
- `apps/web` — initial Next.js 16.2.6 shell (P01 расширяет, не пересоздаёт)
- Neon project + env vars (`DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`) — local `.env` или Vercel preview

---

## Contracts & specs to read (mandatory)

| Document | Why |
|----------|-----|
| [`monorepo_boundaries_contract.md`](../contracts/monorepo_boundaries_contract.md) | PKG-01…03, forbidden imports |
| [`authorization_policy_contract.md`](../contracts/authorization_policy_contract.md) | `PolicySessionContext`, stub `assertCan*` |
| [`global_shell_spec.md`](../specs/global_shell_spec.md) | Layout tree, nav config |
| [`auth_runtime_spec.md`](../../../prds/05_runtime/auth_runtime_spec.md) | Login/register flows, proxy matcher |
| [`database_schema_v1.md`](../../../prds/03_data_model/database_schema_v1.md) | Full DDL |
| [`seed_data_spec.md`](../../../prds/03_data_model/seed_data_spec.md) | Dev users all roles |

---

## In-scope routes (reference only)

Маршруты — [`canonical_routes.md`](../../../design/canonical_routes.md). P01 **MUST** создать файловую структуру и shell для групп; контент — placeholder / auth-only:

| Group | Paths (shell + placeholder) |
|-------|----------------------------|
| `(public)` | `/`, `/auth/login`, `/auth/register` — login/register **functional**; landing **minimal** |
| `(client)` | `/client/dashboard`, `/client/bookings`, `/client/profile` — empty states |
| `(trainer)` | `/trainer/dashboard`, `/trainer/profile`, … — empty + review banner slot |
| `(admin)` | `/admin/dashboard`, … — empty states |
| `(booking)`, `(session)` | Layout only; pages stub |

**MUST NOT** дублировать полный список URL в коде — nav config values only.

---

## Implementation sequence (recommended)

```mermaid
flowchart TD
  A[Workspaces + packages scaffold] --> B[Prisma schema + migrate]
  B --> C[@pulse/domain enums + MutationResult]
  C --> D[policy-edge + policy-server stubs]
  D --> E[Auth.js + register/login actions]
  E --> F[proxy.ts + policy-edge guards]
  F --> G[Shell layouts + shadcn + messages]
  G --> H[Placeholder pages + seed]
  H --> I[typecheck + lint + smoke]
```

---

## Happy path smoke

1. `npm run typecheck` (root) — pass.
2. `npm run lint -w web` — pass.
3. Seed: client, trainer (`pending`), admin exist.
4. Anonymous → `/client/dashboard` → redirect `/auth/login?callbackUrl=…`.
5. Login as client → `/client/dashboard` — shell visible (TopBar + BottomNav on mobile).
6. Login as trainer → `/trainer/dashboard` — «Under review» banner slot renders when `status=pending`.
7. Login as admin → `/admin/dashboard` — admin shell + sidebar nav.
8. Register new client on `/auth/register` → auto session → client dashboard empty state.
9. Theme toggle + Sonner toast on test mutation (dev-only button or register success path).

---

## Negative path smoke

| Scenario | Expected |
|----------|----------|
| Invalid login credentials | Generic error; no account enumeration ([`auth_runtime_spec`](../../../prds/05_runtime/auth_runtime_spec.md)) |
| Duplicate email on register | Field/banner error; no partial user row |
| Trainer accesses `/admin/*` | Redirect or 403 per proxy |
| Missing `AUTH_SECRET` / `DATABASE_URL` | Build or runtime fail with clear message |

---

## Security smoke

| Check | Expected |
|-------|----------|
| Client JWT → `GET /admin/dashboard` | Denied at proxy (403 or redirect login) |
| Unauthenticated Server Action (protected) | `assertCan*` / session gate denies |
| `policy-server` import in `proxy.ts` | **Lint/build fail** — FM-003 guard |
| Password in response/logs | Never returned |

---

## Concurrency & race check

| Scenario | P01 expectation |
|----------|-----------------|
| Double submit register | UNIQUE on `user.email` — one row; second returns validation error ([**FM-001**](../../../prds/02_domain_model/failure_modes_catalog.md)) |
| Concurrent package boundary violation | CI typecheck catches forbidden imports |

---

## Definition of done

- [ ] All `@pulse/*` packages scaffolded; import graph matches [`monorepo_boundaries_contract.md`](../contracts/monorepo_boundaries_contract.md)
- [ ] Prisma migrate applied; schema matches [`database_schema_v1.md`](../../../prds/03_data_model/database_schema_v1.md)
- [ ] Auth.js: login, client register, JWT `role`, sign-out
- [ ] `proxy.ts` live; **no** `middleware.ts` as canonical
- [ ] Global shell per [`global_shell_spec.md`](../specs/global_shell_spec.md)
- [ ] `@/lib/messages` + `PRODUCT_TOAST_DURATION_MS` wired
- [ ] Smoke checklist above passed
- [ ] No Resend/Stripe/Daily code or env usage
- [ ] Docs: if behavior diverges from spec — update spec in same PR

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P01_tasks.md`](../tasks/P01_tasks.md) | Agent checklist |
| [`P02_phase_description.md`](./P02_phase_description.md) | Next phase — public discovery |
| [`monorepo_boundaries_contract.md`](../contracts/monorepo_boundaries_contract.md) | Package rules |
| [`global_shell_spec.md`](../specs/global_shell_spec.md) | Shell implementation |
| [`documentation_creation_registry.md`](../../../meta/documentation_creation_registry.md) | Wave W11-01 |

**Registry:** [`documentation_creation_registry.md`](../../../meta/documentation_creation_registry.md) — wave W11-01

---

## Agent notes

- **Одна сессия = P01 only.** Не начинать catalog/booking UI.
- Async APIs: `await cookies()`, `await params`, `await searchParams` — Next.js 16.
- `proxy.ts` — **JWT/cookie checks only**; DB checks in Server Actions via `policy-server`.
- Не писать business logic в `apps/web` — даже register создаёт user через domain/policy layer.
- После scaffold — обновить `apps/web/AGENTS.md` только если меняется структура каталогов.

---

## Acceptance criteria

- [ ] Front matter + DoD checklist complete
- [ ] Smoke: happy auth + shell + negative login + security 403 admin
- [ ] Race: duplicate email register handled
- [ ] Context7 APIs reflected (async headers/cookies, Auth.js JWT role, Prisma dual URL)
- [ ] No second route inventory (link to `canonical_routes.md` only)
