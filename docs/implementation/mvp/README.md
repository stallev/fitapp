# Implementation MVP

Фазовая декомпозиция разработки Pulse — формат идентичен lampto.

**Registry:** [`documentation_creation_registry.md`](../../meta/documentation_creation_registry.md) — волны W8–W16 **complete**

**Статус:** contracts (W8) + specs (W9) + wireframes (W10) + phases **P01–P15** (W16) + operations & guides (W12) + architecture learning pack (W13) + index sync (W14) — **Canonical**. **P08 implementation complete** (client hub + cancelBooking). Следующий шаг: **P09** (client reviews).

**Миграция W11→W16:** [`phases_tasks_descriptions/_migration_P01-P07_to_P01-P15.md`](phases_tasks_descriptions/_migration_P01-P07_to_P01-P15.md)

**Верификация в конце каждой фазы (обязательно):**

```bash
npm run typecheck   # все workspaces
npm run lint        # apps/web + все packages/* (не только web)
```

См. [`_phase_template.md`](phases_tasks_descriptions/_phase_template.md) §Definition of done.

---

## Структура

| Каталог | Содержимое | Статус |
|---------|------------|--------|
| `phases_tasks_descriptions/` | `P{N}_phase_description.md` (P01–P15) + `_phase_template.md` | **Canonical** (W16) |
| `tasks/` | `P{N}_tasks.md` — чеклисты для агентов (P01–P15) | **Canonical** (W16) |
| `ui_component_phase_matrix.md` | Phase × Component × Route × CREATE/USE | **Canonical** (W16) |
| `contracts/` | Контракты между модулями | **Canonical** (W8) |
| `specs/` | Детальные specs (booking wizard, trainer onboarding) | **Canonical** (W9) |
| `guides/` | Local dev, deploy, migrations, seed, cron | **Canonical** (W12) |

---

## Reference

- Lampto MVP: [`docs/examples/lampto/docs/implementation/mvp/`](../../examples/lampto/docs/implementation/mvp/)
- Methodology: [`docs/meta/ai_first_project_methodology.md`](../../meta/ai_first_project_methodology.md) §2.5
- Architecture map: [`docs/prds/architecture_master_index.md`](../../prds/architecture_master_index.md) §12

---

## Phases (W16 — Canonical)

| Phase | Description | Tasks |
|-------|-------------|-------|
| P01 | Monorepo & data layer | [`P01_phase_description.md`](phases_tasks_descriptions/P01_phase_description.md) | [`P01_tasks.md`](tasks/P01_tasks.md) |
| P02 | Auth & request guards | [`P02_phase_description.md`](phases_tasks_descriptions/P02_phase_description.md) | [`P02_tasks.md`](tasks/P02_tasks.md) |
| P03 | Design system & app shell | [`P03_phase_description.md`](phases_tasks_descriptions/P03_phase_description.md) | [`P03_tasks.md`](tasks/P03_tasks.md) |
| P04 | Public landing | [`P04_phase_description.md`](phases_tasks_descriptions/P04_phase_description.md) | [`P04_tasks.md`](tasks/P04_tasks.md) |
| P05 | Catalog discovery | [`P05_phase_description.md`](phases_tasks_descriptions/P05_phase_description.md) | [`P05_tasks.md`](tasks/P05_tasks.md) |
| P06 | Trainer profile + wishlist | [`P06_phase_description.md`](phases_tasks_descriptions/P06_phase_description.md) | [`P06_tasks.md`](tasks/P06_tasks.md) |
| P07 | Booking wizard | [`P07_phase_description.md`](phases_tasks_descriptions/P07_phase_description.md) | [`P07_tasks.md`](tasks/P07_tasks.md) |
| P08 | Client bookings hub | [`P08_phase_description.md`](phases_tasks_descriptions/P08_phase_description.md) | [`P08_tasks.md`](tasks/P08_tasks.md) |
| P09 | Client reviews | [`P09_phase_description.md`](phases_tasks_descriptions/P09_phase_description.md) | [`P09_tasks.md`](tasks/P09_tasks.md) |
| P10 | Trainer onboarding | [`P10_phase_description.md`](phases_tasks_descriptions/P10_phase_description.md) | [`P10_tasks.md`](tasks/P10_tasks.md) |
| P11 | Trainer profile & services | [`P11_phase_description.md`](phases_tasks_descriptions/P11_phase_description.md) | [`P11_tasks.md`](tasks/P11_tasks.md) |
| P12 | Trainer schedule & clients | [`P12_phase_description.md`](phases_tasks_descriptions/P12_phase_description.md) | [`P12_tasks.md`](tasks/P12_tasks.md) |
| P13 | Admin moderation | [`P13_phase_description.md`](phases_tasks_descriptions/P13_phase_description.md) | [`P13_tasks.md`](tasks/P13_tasks.md) |
| P14 | Quality gate (a11y, UI states) | [`P14_phase_description.md`](phases_tasks_descriptions/P14_phase_description.md) | [`P14_tasks.md`](tasks/P14_tasks.md) |
| P15 | Email & jobs *(post-MVP)* | [`P15_phase_description.md`](phases_tasks_descriptions/P15_phase_description.md) | [`P15_tasks.md`](tasks/P15_tasks.md) |

---

## Contracts (W8 — Canonical)

| Contract | Назначение |
|----------|------------|
| [`contracts/monorepo_boundaries_contract.md`](contracts/monorepo_boundaries_contract.md) | PKG rules, import graph |
| [`contracts/authorization_policy_contract.md`](contracts/authorization_policy_contract.md) | `assertCan*` API |
| [`contracts/schedule_slots_contract.md`](contracts/schedule_slots_contract.md) | Slots + TZ |
| [`contracts/booking_lifecycle_contract.md`](contracts/booking_lifecycle_contract.md) | Booking mutations |
| [`contracts/wishlist_contract.md`](contracts/wishlist_contract.md) | Idempotent wishlist |
| [`contracts/trainer_verification_contract.md`](contracts/trainer_verification_contract.md) | Admin moderation |
| [`contracts/file_upload_contract.md`](contracts/file_upload_contract.md) | S3 file lifecycle |
| [`contracts/review_moderation_contract.md`](contracts/review_moderation_contract.md) | Reviews |
| [`contracts/email_notifications_contract.md`](contracts/email_notifications_contract.md) | Post-MVP email jobs |

---

## Specs (W9 — Canonical)

| Spec | Назначение |
|------|------------|
| [`specs/global_shell_spec.md`](specs/global_shell_spec.md) | App shell, layouts, nav config |
| [`specs/password_reset_spec.md`](specs/password_reset_spec.md) | Post-MVP password reset |
| [`specs/catalog_discovery_spec.md`](specs/catalog_discovery_spec.md) | Catalog & trainer profile |
| [`specs/trainer_onboarding_spec.md`](specs/trainer_onboarding_spec.md) | Trainer registration wizard |
| [`specs/booking_wizard_spec.md`](specs/booking_wizard_spec.md) | 3-step booking flow |
| [`specs/trainer_schedule_spec.md`](specs/trainer_schedule_spec.md) | Weekly schedule & exceptions |
| [`specs/admin_verification_spec.md`](specs/admin_verification_spec.md) | Admin trainer moderation |
| [`specs/complaint_refund_spec.md`](specs/complaint_refund_spec.md) | Complaints & manual refunds |
| [`specs/design_system_lab_spec.md`](specs/design_system_lab_spec.md) | Shared UI primitives + Design Lab page (P03+) |

---

## Guides (W12 — Canonical)

| Guide | Назначение |
|-------|------------|
| [`guides/local_dev_setup.md`](guides/local_dev_setup.md) | Первый локальный запуск |
| [`guides/vercel_deploy_guide.md`](guides/vercel_deploy_guide.md) | Vercel preview/production |
| [`guides/neon_prisma_migrations_guide.md`](guides/neon_prisma_migrations_guide.md) | Neon branches + Prisma v7 CLI |
| [`guides/seed_and_fixtures_guide.md`](guides/seed_and_fixtures_guide.md) | Dev seed + smoke credentials |
| [`guides/cron_jobs_setup_guide.md`](guides/cron_jobs_setup_guide.md) | Vercel Cron (post-MVP P15) |

Ops PRD: [`../../prds/06_operations/README.md`](../../prds/06_operations/README.md)

---

## Architecture Learning Pack (W13 — Canonical)

| Document | Назначение |
|----------|------------|
| [`../../architecture_learning_pack/01_architecture_overview.md`](../../architecture_learning_pack/01_architecture_overview.md) | Monorepo overview, two contours |
| [`../../architecture_learning_pack/02_booking_lifecycle_layers.md`](../../architecture_learning_pack/02_booking_lifecycle_layers.md) | Booking mutations layer map |
| [`../../architecture_learning_pack/03_trainer_verification_layers.md`](../../architecture_learning_pack/03_trainer_verification_layers.md) | Trainer moderation layer map |
| [`../../architecture_learning_pack/04_email_jobs_layers.md`](../../architecture_learning_pack/04_email_jobs_layers.md) | Email enqueue vs Cron worker |

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`../../design/wireframes/route_index.md`](../../design/wireframes/route_index.md) | Wireframes (W10) |
| [`../../prds/06_operations/`](../../prds/06_operations/) | Operations layer |
| [`../../meta/documentation_creation_registry.md`](../../meta/documentation_creation_registry.md) | Wave W14 complete |
