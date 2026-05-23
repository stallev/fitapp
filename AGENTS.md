# Pulse — Monorepo Agent Instructions

**Pulse** — онлайн-маркетплейс фитнес-тренеров (клиенты, тренеры, админы).  
Monorepo: **Next.js 16.2.6** App Router + Vercel + Neon PostgreSQL.

**Methodology (обязательно):** [`docs/meta/ai_first_project_methodology.md`](docs/meta/ai_first_project_methodology.md) — цикл КОНТЕКСТ → ФАЗА → КОНТРАКТ → ЗАДАЧИ → ВЕРИФИКАЦИЯ.

## Референсный проект (обязательно)

Архитектурные подходы, структура документации и паттерны разработки **наследуются** из референсного проекта **lampto** (BSFY):

- Код и документация референса: [`docs/examples/lampto/`](docs/examples/lampto/)
- Сводка для Pulse: [`docs/reference/lampto_project_reference.md`](docs/reference/lampto_project_reference.md)

**Правило:** если в Pulse-документе нет явного отличия — следовать lampto. Отличия стека и домена зафиксированы в [ADR-001](docs/prds/07_governance/adr_001_stack_and_runtime.md) и [ADR-002](docs/prds/07_governance/adr_002_next162_vercel_runtime_policy.md).

**Приоритет над lampto:** Pulse Cursor Rules и Guidelines **важнее** reference-кода lampto — см. [`lampto_project_reference.md`](docs/reference/lampto_project_reference.md) §Priority.

## Monorepo structure (целевая)

| Путь | Назначение |
|------|------------|
| [`apps/web`](apps/web/AGENTS.md) | Next.js App Router (тонкий BFF) — см. [`apps/web/AGENTS.md`](apps/web/AGENTS.md) |
| `apps/workers` | Фоновые задачи (Vercel Cron / serverless jobs на MVP; см. ADR-001) |
| `packages/domain` | Чистые бизнес-правила (без Next.js, без Vercel SDK, без DB) |
| `packages/policy/edge` | JWT-only проверки. **Без DB.** |
| `packages/policy/server` | Object-level проверки с Prisma. Только Route Handlers и Server Actions |
| `packages/db` | Prisma schema. Канон DDL: [`docs/prds/03_data_model/database_schema_v1.md`](docs/prds/03_data_model/database_schema_v1.md) |

## Cross-package rules

- `apps/*` handlers = тонкие адаптеры. Логика живёт в `packages/`
- **Запрещено** импортировать `packages/policy/server` из request interception layer (`proxy.ts`, `middleware.ts`) и Edge runtime
- **`TrainerProfile.timezone`** — источник истины для расписания, слотов, напоминаний и отображения времени
- Каждый фоновый job: **`idempotency_key` + запись в `delivery_log`**
- Долгие операции (email batch, напоминания) — **не в request path** → workers/cron
- Post-MVP поля (Stripe, Daily.co) — nullable в схеме с первого дня

## Иерархия источников истины

При конфликте: **Cursor Rules** → **AGENTS.md** (web AGENTS для web-кода, корень для monorepo invariants) → **Contracts** → **PRD** → **Guidelines** → **Prototype**.  
Web AGENTS не отменяет Cursor Rules — только маршрутизирует. Monorepo invariants из этого файла имеют приоритет над web AGENTS.

## Документация — точки входа

| Область | Документ |
|---------|----------|
| Методология AI-first | [`docs/meta/ai_first_project_methodology.md`](docs/meta/ai_first_project_methodology.md) |
| Карта архитектуры | [`docs/prds/architecture_master_index.md`](docs/prds/architecture_master_index.md) |
| Обзор для новых агентов | [`docs/architecture_learning_pack/01_architecture_overview.md`](docs/architecture_learning_pack/01_architecture_overview.md) |
| MVP scope (interim) | [`docs/default_docs/fitness-platform-mvp.md`](docs/default_docs/fitness-platform-mvp.md) |
| **User flows (canonical)** | [`docs/prds/01_product_scope/user_flows/users_mvp/`](docs/prds/01_product_scope/user_flows/users_mvp/) |
| **Database schema (canonical)** | [`docs/prds/03_data_model/database_schema_v1.md`](docs/prds/03_data_model/database_schema_v1.md) |
| Страницы и маршруты | [`docs/design/canonical_routes.md`](docs/design/canonical_routes.md), [`docs/default_docs/fitness-platform-pages.md`](docs/default_docs/fitness-platform-pages.md) |
| Design system | [`docs/default_docs/fitness-platform-design-system.md`](docs/default_docs/fitness-platform-design-system.md) |
| Guidelines + Cursor Rules | [`docs/guidelines/README.md`](docs/guidelines/README.md) |
| HTML-прототип | [`docs/prototypes/Fitness_Platform_Prototype_v1.html`](docs/prototypes/Fitness_Platform_Prototype_v1.html) |
| Runtime / стек | [`docs/prds/07_governance/adr_001_stack_and_runtime.md`](docs/prds/07_governance/adr_001_stack_and_runtime.md), [ADR-002](docs/prds/07_governance/adr_002_next162_vercel_runtime_policy.md) |

## Цикл работы агента

```
КОНТЕКСТ → ФАЗА → КОНТРАКТ → ЗАДАЧИ → ВЕРИФИКАЦИЯ
```

1. Прочитать этот файл, [`ai_first_project_methodology.md`](docs/meta/ai_first_project_methodology.md) и `.cursor/rules/pulse-project-context.mdc`
2. При работе в `apps/web` — также [`apps/web/AGENTS.md`](apps/web/AGENTS.md)
3. Определить фазу (`docs/implementation/mvp/phases_tasks_descriptions/P{N}_*.md`)
4. Прочитать contracts для фазы
5. Выполнить чеклист из `docs/implementation/mvp/tasks/P{N}_tasks.md`
6. Верифицировать по чеклисту фазы и обновить документацию при изменении behavior

## Статус репозитория

**Текущая фаза:** P01 (scaffold).  
`apps/web` — начальный Next.js shell; `packages/` и workers — ещё не созданы.  
Не расширять реализацию без явной фазы и contract.

### Manual verification checklist (monorepo)

- [ ] Изменения согласуются с [`ai_first_project_methodology.md`](docs/meta/ai_first_project_methodology.md)
- [ ] Отличия от lampto явно задокументированы (ADR или contract)
- [ ] Маршруты не дублируются вне [`canonical_routes.md`](docs/design/canonical_routes.md)
- [ ] Domain invariants не нарушены (timezone, booking state machine, trainer verification)
