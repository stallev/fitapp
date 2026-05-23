# 01 — Архитектура проекта Pulse: общий обзор

**Дата:** 2026-05-23  
**Стек MVP:** Next.js **16.2.6** (Vercel) + Neon PostgreSQL + Prisma v7 + Resend + Vercel Blob  
**Runtime:** [ADR-002](../prds/07_governance/adr_002_next162_vercel_runtime_policy.md) — `proxy.ts`, async APIs
**Референс архитектуры:** [`docs/examples/lampto/`](../examples/lampto/) — см. [`lampto_project_reference.md`](../reference/lampto_project_reference.md)

---

## 1) Что мы строим

**Pulse** — онлайн-маркetplace, соединяющий клиентов с фитнес-тренерами.

Три роли:

| Роль | Задачи в MVP |
|------|----------------|
| **Client** | Поиск тренеров, wishlist, бронирование слотов, управление сессиями, отзывы |
| **Trainer** | Профиль, услуги, расписание, клиенты, доходы (без Stripe на MVP) |
| **Admin** | Верификация тренеров, жалобы, возвраты (ручные), модерация отзывов |

Подробнее: [`fitness-platform-mvp.md`](../default_docs/fitness-platform-mvp.md), user flows в [`default_docs/`](../default_docs/).

**Визуальный эталон:** [`Fitness_Platform_Prototype_v1.html`](../prototypes/Fitness_Platform_Prototype_v1.html) — Warm Forest / Material You.

---

## 2) Почему двухконтурный MVP (Web + Jobs)

Модель **наследуется из lampto** — см. [`lampto/.../01_architecture_overview.md`](../examples/lampto/docs/architecture_learning_pack/01_architecture_overview.md).

### Контур A — Web (Vercel)

- UI + **тонкий BFF** (Route Handlers / Server Actions)
- быстрый time-to-market, preview deployments из PR
- Auth.js Credentials, role-based **`proxy.ts`** gate (Next.js 16.2.6)
- Neon + Prisma v7 с connection pooling для serverless

### Контур B — Jobs

На MVP:
- **Vercel Cron** + serverless handlers
- email через **Resend** (напоминания 24h, регистрация, booking confirmed)
- обязательные **`idempotency_key`** + **`delivery_log`**

Post-MVP при росте: очередь (SQS или аналог) — см. [ADR-001](../prds/07_governance/adr_001_stack_and_runtime.md).

**Правило:** никакой batch email / reminder logic в request path пользователя.

---

## 3) Главный «скелет» данных

- **Neon PostgreSQL 17** — единственный источник истины
- **Prisma v7** — единственное DDL (`packages/db`)
- Web и Jobs используют **один и тот же** domain / policy / db код

Post-MVP поля (Stripe Connect, Daily.co room IDs) — **nullable с первого дня**.

---

## 4) Monorepo — слои (как lampto)

```
apps/web          → HTTP/UI адаптер (тонкий)
apps/workers      → Cron/job адаптер (тонкий)
packages/domain   → use-cases, ports, pure rules
packages/policy   → edge (JWT) + server (Prisma ACL)
packages/db       → Prisma, repositories
```

**Запрещено:** `packages/domain` → `packages/db`; **`proxy.ts` / `middleware.ts`** → `policy/server`.

Эталон реализации слоёв в lampto: account deletion flow — [`15_reference_account_deletion_layers_ru.md`](../examples/lampto/docs/architecture_learning_pack/15_reference_account_deletion_layers_ru.md).

**Для Pulse:** booking lifecycle и trainer verification должны быть первыми flows с такой же структурой.

---

## 5) Основные потоки данных

### 5.1 Discovery → Booking

```
Client UI → apps/web (BFF) → policy/server → domain (CreateBooking) → db → Neon
```

Статус booking на MVP: **`pending`** (без оплаты). Email client + trainer через Resend job.

### 5.2 Trainer schedule → Available slots

```
Catalog/Profile UI → BFF → domain (GetAvailableSlots)
  → reads TrainerProfile.timezone + weekly schedule + exceptions
```

**Invariant:** `TrainerProfile.timezone` — единственный источник истины для слотов и отображения времени.

### 5.3 Trainer onboarding → Admin approval

```
Register (multi-step) → TrainerProfile status=pending
Admin approves → status=approved → public listing + booking enabled
```

### 5.4 Email reminders (24h)

```
Vercel Cron → workers handler → domain (EnqueueReminders)
  → idempotency_key per booking+type → Resend → delivery_log
```

---

## 6) Что важно не сломать (инварианты Pulse)

1. **`TrainerProfile.timezone`** — source of truth для расписания и уведомлений  
2. **Booking lifecycle** — только documented transitions в domain  
3. **Trainer verification** — публичный профиль только при `approved`  
4. **Jobs идемпотентны** — повторный cron не дублирует email  
5. **Post-MVP schema readiness** — Stripe/Daily nullable, no breaking DDL later  

---

## 7) UI и responsive (кратко)

- **Mobile-first**, breakpoints: md 768, lg 1024
- Mobile: Bottom Nav (`md:hidden`)
- Tablet+: Sidebar (`hidden md:flex`)
- Design tokens: Warm Forest — [`fitness-platform-design-system.md`](../default_docs/fitness-platform-design-system.md)
- Маршруты: [`canonical_routes.md`](../design/canonical_routes.md)

---

## 8) Когда выносить отдельный backend

Как в lampto — когда появляются:
- мобильный клиент / public API
- команда > 5–7 человек
- тяжёлая аналитика
- realtime (video chat post-MVP)

MVP строится так, чтобы шаг был **механическим**.

---

## 9) Следующие шаги (документация)

| Документ | Задача |
|----------|--------|
| `prds/01_product_scope/mvp_scope.md` | Миграция MVP PRD |
| `prds/03_data_model/database_schema_v1.md` | Канон схемы |
| `prds/02_domain_model/lifecycle_models.md` | State machines |
| `implementation/mvp/P01_*` | Scaffold monorepo |
| Guidelines port | Из lampto с адаптацией Vercel |

---

## 10) Быстрые ссылки

| | |
|---|---|
| Методология | [`ai_first_project_methodology.md`](../meta/ai_first_project_methodology.md) |
| Карта архитектуры | [`architecture_master_index.md`](../prds/architecture_master_index.md) |
| Agent entry | [`AGENTS.md`](../../AGENTS.md) |
| Lampto reference | [`lampto_project_reference.md`](../reference/lampto_project_reference.md) |
| ADR стека | [`adr_001_stack_and_runtime.md`](../prds/07_governance/adr_001_stack_and_runtime.md) |

---

*Первый документ Architecture Learning Pack для Pulse. Обновлять при существенных архитектурных изменениях.*
