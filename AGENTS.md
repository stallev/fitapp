# Pulse — Monorepo Agent Instructions

**Pulse** — онлайн-маркетплейс фитнес-тренеров (клиенты, тренеры, админы).  
Monorepo на **Next.js 16.2.6** App Router + Vercel + Neon PostgreSQL.

**Methodology (обязательно):** [`docs/meta/ai_first_project_methodology.md`](docs/meta/ai_first_project_methodology.md) — цикл КОНТЕКСТ → ФАЗА → КОНТРАКТ → ЗАДАЧИ → ВЕРИФИКАЦИЯ.

## Референсный проект (обязательно)

Архитектурные подходы, структура документации и паттерны разработки **наследуются** из референсного проекта **lampto** (BSFY):

- Код и документация референса: [`docs/examples/lampto/`](docs/examples/lampto/)
- Сводка для Pulse: [`docs/reference/lampto_project_reference.md`](docs/reference/lampto_project_reference.md)

**Правило:** если в Pulse-документе нет явного отличия — следовать lampto. Отличия стека и домена зафиксированы в [ADR-001](docs/prds/07_governance/adr_001_stack_and_runtime.md) и [ADR-002](docs/prds/07_governance/adr_002_next162_vercel_runtime_policy.md).

## Monorepo structure (целевая)

- `apps/web` — Next.js **16.2.6** App Router (тонкий BFF). Правила приложения: `apps/web/AGENTS.md` *(создаётся при scaffold)*
- `apps/workers` — фоновые задачи (Vercel Cron / serverless jobs на MVP; см. ADR-001)
- `packages/domain` — чистые бизнес-правила (без Next.js, без Vercel SDK, без DB)
- `packages/policy/edge` — JWT-only проверки. **Без DB.** Безопасно для **`proxy.ts`**
- `packages/policy/server` — object-level проверки с Prisma. Только Route Handlers и Server Actions
- `packages/db` — Prisma schema. Канон DDL: [`docs/prds/03_data_model/database_schema_v1.md`](docs/prds/03_data_model/database_schema_v1.md)

## Cross-package rules

- `apps/*` handlers = тонкие адаптеры. Логика живёт в `packages/`
- **Запрещено** импортировать `packages/policy/server` из **`proxy.ts`**, `middleware.ts` / Edge runtime
- **Request interception (Next.js 16):** канон — **`apps/web/src/proxy.ts`**; `middleware.ts` — только временная миграция ([ADR-002](docs/prds/07_governance/adr_002_next162_vercel_runtime_policy.md))
- **`TrainerProfile.timezone`** — источник истины для расписания, слотов, напоминаний и отображения времени
- Каждый фоновый job: **`idempotency_key` + запись в `delivery_log`**
- Долгие операции (email batch, напоминания) — **не в request path** → workers/cron (не `unstable_after`)
- Post-MVP поля (Stripe, Daily.co) — nullable в схеме с первого дня

## Документация — точки входа

| Область | Документ |
|---------|----------|
| Методология AI-first | [`docs/meta/ai_first_project_methodology.md`](docs/meta/ai_first_project_methodology.md) |
| **Next.js 16.2.6 runtime** | [`docs/prds/07_governance/adr_002_next162_vercel_runtime_policy.md`](docs/prds/07_governance/adr_002_next162_vercel_runtime_policy.md) |
| Карта архитектуры | [`docs/prds/architecture_master_index.md`](docs/prds/architecture_master_index.md) |
| Обзор для новых агентов | [`docs/architecture_learning_pack/01_architecture_overview.md`](docs/architecture_learning_pack/01_architecture_overview.md) |
| MVP scope (interim) | [`docs/default_docs/fitness-platform-mvp.md`](docs/default_docs/fitness-platform-mvp.md) |
| **User flows (canonical)** | [`docs/prds/01_product_scope/user_flows/users_mvp/`](docs/prds/01_product_scope/user_flows/users_mvp/) |
| **Database schema (canonical)** | [`docs/prds/03_data_model/database_schema_v1.md`](docs/prds/03_data_model/database_schema_v1.md) |
| Страницы и маршруты | [`docs/design/canonical_routes.md`](docs/design/canonical_routes.md), [`docs/default_docs/fitness-platform-pages.md`](docs/default_docs/fitness-platform-pages.md) |
| Design system | [`docs/default_docs/fitness-platform-design-system.md`](docs/default_docs/fitness-platform-design-system.md) |
| Guidelines | [`docs/guidelines/README.md`](docs/guidelines/README.md) |
| HTML-прототип | [`docs/prototypes/Fitness_Platform_Prototype_v1.html`](docs/prototypes/Fitness_Platform_Prototype_v1.html) |
| Runtime / стек | [`docs/prds/07_governance/adr_001_stack_and_runtime.md`](docs/prds/07_governance/adr_001_stack_and_runtime.md) |

## Cursor Rules

Always applied: `pulse-project-context.mdc`, `product-docs-alignment.mdc`, `typescript-monorepo-types.mdc`, `ai-dry-deduplication.mdc`, `react-one-component-per-file.mdc`, UI mutation rules.  
Scoped (UI on scaffold): `ui-mobile-first`, `ui-prototype-fidelity`, `ui-semantics-a11y`, `react-logic-presentation`, `react-naming-conventions`, `ui-icons-lucide`, … — полный список: [`docs/guidelines/README.md`](docs/guidelines/README.md).

**Приоритет над lampto:** Pulse Cursor Rules и Guidelines **важнее** reference-кода lampto — см. [`lampto_project_reference.md`](docs/reference/lampto_project_reference.md) §Priority.

## Цикл работы агента

```
КОНТЕКСТ → ФАЗА → КОНТРАКТ → ЗАДАЧИ → ВЕРИФИКАЦИЯ
```

1. Прочитать этот файл, [`ai_first_project_methodology.md`](docs/meta/ai_first_project_methodology.md) и `.cursor/rules/pulse-project-context.mdc`
2. Определить фазу (`docs/implementation/mvp/phases_tasks_descriptions/P{N}_*.md`)
3. Прочитать contracts для фазы
4. Выполнить чеклист из `docs/implementation/mvp/tasks/P{N}_tasks.md`
5. Верифицировать по чеклисту фазы и обновить документацию при изменении behavior

## Статус репозитория

**Текущая задача:** первичная документация и структура каталогов.  
Прикладной код (`apps/`, `packages/`) **ещё не создан** — не scaffold'ить без явной фазы.

### Manual verification checklist

- [ ] `next` pinned to **16.2.6** when package.json exists
- [ ] New interception uses **`proxy.ts`**, not Next 15 `middleware.ts` patterns
- [ ] Изменения согласуются с [`ai_first_project_methodology.md`](docs/meta/ai_first_project_methodology.md)
- [ ] Отличия от lampto явно задокументированы (ADR или contract)
- [ ] Маршруты не дублируются вне [`canonical_routes.md`](docs/design/canonical_routes.md)
