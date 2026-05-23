# Pulse — Monorepo Agent Instructions

**Pulse** — онлайн-маркетплейс фитнес-тренеров (клиенты, тренеры, админы).  
Monorepo на Next.js 15 App Router + Vercel + Neon PostgreSQL.

## Референсный проект (обязательно)

Архитектурные подходы, структура документации и паттерны разработки **наследуются** из референсного проекта **lampto** (BSFY):

- Код и документация референса: [`docs/examples/lampto/`](docs/examples/lampto/)
- Сводка для Pulse: [`docs/reference/lampto_project_reference.md`](docs/reference/lampto_project_reference.md)
- Методология AI-first (канон Pulse): [`docs/meta/ai_first_project_methodology.md`](docs/meta/ai_first_project_methodology.md)

**Правило:** если в Pulse-документе нет явного отличия — следовать lampto. Отличия стека и домена зафиксированы в [ADR-001](docs/prds/07_governance/adr_001_stack_and_runtime.md).

## Monorepo structure (целевая)

- `apps/web` — Next.js 15 App Router (тонкий BFF). Правила приложения: `apps/web/AGENTS.md` *(создаётся при scaffold)*
- `apps/workers` — фоновые задачи (Vercel Cron / serverless jobs на MVP; см. ADR-001)
- `packages/domain` — чистые бизнес-правила (без Next.js, без Vercel SDK, без DB)
- `packages/policy/edge` — JWT-only проверки. **Без DB.** Безопасно для `middleware.ts`
- `packages/policy/server` — object-level проверки с Prisma. Только Route Handlers и Server Actions
- `packages/db` — Prisma schema. Канон DDL: `docs/prds/03_data_model/database_schema_v1.md` *(следующая задача)*

## Cross-package rules

- `apps/*` handlers = тонкие адаптеры. Логика живёт в `packages/`
- **Запрещено** импортировать `packages/policy/server` из `middleware.ts` / Edge runtime
- **`TrainerProfile.timezone`** — источник истины для расписания, слотов, напоминаний и отображения времени
- Каждый фоновый job: **`idempotency_key` + запись в `delivery_log`**
- Долгие операции (email batch, напоминания) — **не в request path** → workers/cron
- Post-MVP поля (Stripe, Daily.co) — nullable в схеме с первого дня; включение фичи не требует нового DDL

## Документация — точки входа

| Область | Документ |
|---------|----------|
| Методология AI-first | [`docs/meta/ai_first_project_methodology.md`](docs/meta/ai_first_project_methodology.md) |
| Карта архитектуры | [`docs/prds/architecture_master_index.md`](docs/prds/architecture_master_index.md) |
| Обзор для новых агентов | [`docs/architecture_learning_pack/01_architecture_overview.md`](docs/architecture_learning_pack/01_architecture_overview.md) |
| MVP scope (черновик) | [`docs/default_docs/fitness-platform-mvp.md`](docs/default_docs/fitness-platform-mvp.md) |
| User flows | [`docs/default_docs/user-flow-client.md`](docs/default_docs/user-flow-client.md), [`user-flow-trainer.md`](docs/default_docs/user-flow-trainer.md), [`user-flow-admin.md`](docs/default_docs/user-flow-admin.md) |
| Страницы и маршруты | [`docs/design/canonical_routes.md`](docs/design/canonical_routes.md), [`docs/default_docs/fitness-platform-pages.md`](docs/default_docs/fitness-platform-pages.md) |
| Design system | [`docs/default_docs/fitness-platform-design-system.md`](docs/default_docs/fitness-platform-design-system.md) |
| HTML-прототип | [`docs/prototypes/Fitness_Platform_Prototype_v1.html`](docs/prototypes/Fitness_Platform_Prototype_v1.html) |
| Runtime / стек | [`docs/prds/07_governance/adr_001_stack_and_runtime.md`](docs/prds/07_governance/adr_001_stack_and_runtime.md) |

## Цикл работы агента

```
КОНТЕКСТ → ФАЗА → КОНТРАКТ → ЗАДАЧИ → ВЕРИФИКАЦИЯ
```

1. Прочитать этот файл и `.cursor/rules/pulse-project-context.mdc`
2. Определить фазу (`docs/implementation/mvp/phases_tasks_descriptions/P{N}_*.md`)
3. Прочитать contracts для фазы
4. Выполнить чеклист из `docs/implementation/mvp/tasks/P{N}_tasks.md`
5. Верифицировать по чеклисту фазы и обновить документацию при изменении behavior

## Статус репозитория

**Текущая задача:** первичная документация и структура каталогов.  
Прикладной код (`apps/`, `packages/`) **ещё не создан** — не scaffold'ить без явной фазы.

### Manual verification checklist

- [ ] Изменения согласуются с [`ai_first_project_methodology.md`](docs/meta/ai_first_project_methodology.md)
- [ ] Отличия от lampto явно задокументированы (ADR или contract)
- [ ] Маршруты не дублируются вне [`canonical_routes.md`](docs/design/canonical_routes.md)
- [ ] При изменении behavior обновлены соответствующие PRD / user flow / wireframe
