# P02 Tasks — Auth & Request Guards

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 2.0  
**Дата:** 2026-05-23  
**Волна:** W16  
**Зависит от:** [`P02_phase_description.md`](../phases_tasks_descriptions/P02_phase_description.md)  
**Связанные документы:** [`authorization_policy_contract.md`](../contracts/authorization_policy_contract.md), [`auth_runtime_spec.md`](../../../prds/05_runtime/auth_runtime_spec.md)

---

## Purpose

Чеклист **P02** — Auth.js, login/register, `proxy.ts`, policy packages.

---

## 1. Policy packages

- [ ] `@pulse/policy-edge` — JWT decode, route role matrix (no Prisma)
- [ ] `@pulse/policy-server` — `PolicySessionContext`, stub `assertCan*`
- [ ] Verify forbidden import: `policy-server` **not** in `proxy.ts`

## 2. Auth.js

- [ ] `auth.ts` — Credentials provider, bcrypt verify
- [ ] JWT callback persists `role`; session exposes `session.user.role`
- [ ] Type augmentation for `Session` / `JWT` in `apps/web`
- [ ] Server Actions: `signIn`, `signOut`, `registerClient`
- [ ] `/auth/login` — form, pending UI, generic error
- [ ] `/auth/register` — client form; terms checkbox
- [ ] **MUST NOT** `/auth/register/trainer` (→ P10)

## 3. proxy.ts

- [ ] `apps/web/src/proxy.ts` with matcher per auth_runtime_spec
- [ ] Unauthenticated → protected: redirect login + `callbackUrl`
- [ ] Role mismatch → role home or 403
- [ ] Uses `@pulse/policy-edge` only

## 4. Verification

- [ ] `npm run typecheck`
- [ ] `npm run lint -w web`
- [ ] Smoke: login client/trainer/admin
- [ ] Smoke: invalid credentials — generic error
- [ ] Smoke: client → `/admin/dashboard` denied
- [ ] Smoke: duplicate register email — error

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P02_phase_description.md`](../phases_tasks_descriptions/P02_phase_description.md) | DoD |
| [`P03_tasks.md`](./P03_tasks.md) | Next — shell |

**Registry:** W16
