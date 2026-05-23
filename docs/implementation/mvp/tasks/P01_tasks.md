# P01 Tasks — Monorepo Scaffold, Database, Auth & Global Shell

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-23  
**Волна:** W11  
**Зависит от:** [`P01_phase_description.md`](../phases_tasks_descriptions/P01_phase_description.md)  
**Связанные документы:** [`monorepo_boundaries_contract.md`](../contracts/monorepo_boundaries_contract.md), [`global_shell_spec.md`](../specs/global_shell_spec.md), [`design_system_lab_spec.md`](../specs/design_system_lab_spec.md)

---

## Purpose

Чеклист для AI-агента при выполнении **P01**. Каждый пункт верифицируем (`npm run typecheck`, smoke route, lint).

---

## 1. Monorepo & packages

- [ ] Root `package.json` workspaces: `apps/*`, `packages/*`
- [ ] `@pulse/domain` — `UserRole`, shared enums, `MutationResult`, Zod DTOs (minimal)
- [ ] `@pulse/db` — Prisma schema, client export, `directUrl` config
- [ ] `@pulse/policy-edge` — JWT decode helpers, route role matrix (no Prisma)
- [ ] `@pulse/policy-server` — `PolicySessionContext`, stub `assertCan*` for P01
- [ ] ESLint/tsconfig paths: `@pulse/*` aliases; no deep relative imports to packages
- [ ] Verify forbidden import: `policy-server` **not** imported from `proxy.ts`

## 2. Database

- [ ] Prisma schema matches [`database_schema_v1.md`](../../../prds/03_data_model/database_schema_v1.md)
- [ ] `DATABASE_URL` (pooled) + `DIRECT_URL` (migrations) in `.env.example`
- [ ] Initial migration applied locally
- [ ] Seed script: admin + client + pending trainer ([`seed_data_spec.md`](../../../prds/03_data_model/seed_data_spec.md))
- [ ] Post-MVP columns present but **unused** in app code

## 3. Auth.js

- [ ] `auth.ts` — Credentials provider, bcrypt verify
- [ ] JWT callback persists `role`; session callback exposes `session.user.role`
- [ ] Type augmentation for `Session` / `JWT` in `apps/web`
- [ ] Server Actions: `signIn`, `signOut`, `registerClient`
- [ ] `/auth/login` page — form, pending UI, generic error
- [ ] `/auth/register` — client tile + form; terms checkbox
- [ ] **MUST NOT** implement `/auth/register/trainer` wizard (P04)

## 4. proxy.ts

- [ ] `apps/web/src/proxy.ts` with matcher per [`auth_runtime_spec`](../../../prds/05_runtime/auth_runtime_spec.md)
- [ ] Unauthenticated → protected routes: redirect login + `callbackUrl`
- [ ] Role mismatch → `/client|trainer|admin` home or 403
- [ ] Uses `@pulse/policy-edge` only (no DB)

## 5. Global shell

- [ ] Root layout: fonts (DM Serif, DM Sans, JetBrains Mono), ThemeProvider, Toaster
- [ ] Route groups: `(public)`, `(client)`, `(trainer)`, `(admin)`, `(booking)`, `(session)`
- [ ] `AppShell`, `TopBar`, `BottomNav`, `SidebarNav`, `PageContainer`
- [ ] Nav config module — role → items ([`global_shell_spec.md`](../specs/global_shell_spec.md))
- [ ] Warm Forest tokens in `globals.css` + shadcn baseline components
- [ ] `@/lib/messages` + `apps/web/src/lib/ui/product-toast.ts`

## 5b. Design System Lab (shared UI)

Spec: [`design_system_lab_spec.md`](../specs/design_system_lab_spec.md)

- [ ] Typography atoms: `Heading`, `SectionTitle`, `ContentText`, `AlertText` in `components/atoms/`
- [ ] Tokenized `Button` (replace shadcn default) + `CustomLink` + `PulseCard` in `components/ui/`
- [ ] Card/elevation CSS tokens in `globals.css` per spec § Token migration
- [ ] Dev-only `/design-system` — L1 tokens, L2 variant matrices, L3 patterns; production guard
- [ ] Route registered in [`canonical_routes.md`](../../../design/canonical_routes.md) (dev-only)
- [ ] Visual QA: light + dark, 390px viewport, prototype anchors per spec

## 6. Placeholder pages

- [ ] Role dashboards with empty states (Zero Dead Ends CTA where applicable)
- [ ] `(booking)` / `(session)` layouts — stub children
- [ ] Public landing `/` — minimal hero (full content P02)

## 7. Verification

- [ ] `npm run typecheck` (root)
- [ ] `npm run lint -w web`
- [ ] `npm run build -w web` (optional but recommended)
- [ ] Smoke: login client/trainer/admin
- [ ] Smoke: invalid credentials — generic error
- [ ] Smoke: client → `/admin/dashboard` denied
- [ ] Smoke: duplicate register email — error, no duplicate row
- [ ] No Resend/Stripe/Daily imports

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P01_phase_description.md`](../phases_tasks_descriptions/P01_phase_description.md) | Phase goal & DoD |
| [`P02_tasks.md`](./P02_tasks.md) | Next phase tasks |

**Registry:** [`documentation_creation_registry.md`](../../../meta/documentation_creation_registry.md) — wave W11-02
