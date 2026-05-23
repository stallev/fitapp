# architecture_master_index.md
Project: **Pulse** — Fitness Trainer Marketplace

Version: v1.0  
Status: Architecture navigation document

---

# 1. Purpose

This document is the **entry point for the entire Pulse architecture documentation**.

It defines:

- how architecture documents are organized
- what each document is responsible for
- the order in which documents should be read
- how engineers and AI agents should use them during development

**Reference project:** architectural patterns inherit from **lampto** (BSFY). See [`docs/reference/lampto_project_reference.md`](../reference/lampto_project_reference.md).

**Methodology:** [`docs/meta/ai_first_project_methodology.md`](../meta/ai_first_project_methodology.md).

---

# 2. Architecture Documentation Layers

The architecture is organized into **seven layers** (same model as lampto):

1. Product Scope
2. Domain Model
3. Data Model
4. Authorization & Privacy
5. Runtime Architecture
6. Operations
7. Governance

Each layer has canonical documents. **Interim sources** in [`docs/default_docs/`](../default_docs/) migrate into `prds/` over time.

---

# 3. Product Scope Layer

Purpose: define **what the system does**.

| Document | Status | Purpose |
|----------|--------|---------|
| [`default_docs/fitness-platform-mvp.md`](../default_docs/fitness-platform-mvp.md) | Interim PRD | MVP scope, roles, stack summary, post-MVP deferrals |
| [`default_docs/fitness-platform-pages.md`](../default_docs/fitness-platform-pages.md) | Interim spec | Page-by-page functional spec, responsive rules |
| [`default_docs/user-flow-client.md`](../default_docs/user-flow-client.md) | Interim flow | Client journeys |
| [`default_docs/user-flow-trainer.md`](../default_docs/user-flow-trainer.md) | Interim flow | Trainer journeys |
| [`default_docs/user-flow-admin.md`](../default_docs/user-flow-admin.md) | Interim flow | Admin journeys |
| [`design/canonical_routes.md`](../design/canonical_routes.md) | **Canonical** | Single inventory of all routes — do not duplicate elsewhere |
| [`prototypes/Fitness_Platform_Prototype_v1.html`](../prototypes/Fitness_Platform_Prototype_v1.html) | Visual reference | HTML prototype (Warm Forest UI) |
| `prds/01_product_scope/mvp_scope.md` | Planned | Migrated canonical MVP scope |

**Roles:** `client` | `trainer` | `admin`

**Canonical URLs:** only [`canonical_routes.md`](../design/canonical_routes.md). Do not maintain a second route list in other docs.

---

# 4. Domain Model Layer

Purpose: define **how the system behaves over time**.

| Document | Status | Purpose |
|----------|--------|---------|
| `prds/02_domain_model/lifecycle_models.md` | Planned | State machines: Booking, TrainerProfile, Review, Complaint, Refund |
| Lampto reference | Reference | [`docs/examples/lampto/docs/prds/02_domain_model/lifecycle_models.md`](../examples/lampto/docs/prds/02_domain_model/lifecycle_models.md) — pattern only |

**Key domain areas for Pulse:**

- Booking lifecycle (`pending` → `confirmed` → `completed` / `cancelled`)
- Trainer verification (`pending` → `approved` / `rejected`)
- Session completion → review prompt
- Schedule slots vs exceptions (blocked dates)

---

# 5. Data Model Layer

Purpose: define **how data is stored**.

| Document | Status | Purpose |
|----------|--------|---------|
| `prds/03_data_model/database_schema_v1.md` | Planned | Canonical PostgreSQL/Neon schema |
| `prds/03_data_model/data_access_patterns.md` | Planned | SQL/query patterns for hot paths |
| `prds/03_data_model/indexing_strategy.md` | Planned | Indexes for catalog, schedule, bookings |
| Lampto reference | Reference | [`database_schema_v3.md`](../examples/lampto/docs/prds/03_data_model/database_schema_v3.md) — layering pattern |

**Invariant:** Post-MVP fields (Stripe, Daily.co) nullable from day one — see MVP doc.

---

# 6. Authorization & Privacy Layer

Purpose: define **who can see and change what**.

| Document | Status | Purpose |
|----------|--------|---------|
| `prds/04_authorization_privacy/authorization_matrix.md` | Planned | Role × resource matrix |
| `prds/04_authorization_privacy/policy_enforcement_contract.md` | Planned | Server-side enforcement points |
| Lampto reference | Reference | [`authorization_matrix.md`](../examples/lampto/docs/prds/04_authorization_privacy/authorization_matrix.md) |

**MVP auth:** Auth.js v5 Credentials, JWT, role in session, middleware route guards.

---

# 7. Runtime Architecture Layer

Purpose: define **how the system executes requests and jobs**.

| Document | Status | Purpose |
|----------|--------|---------|
| [`prds/07_governance/adr_001_stack_and_runtime.md`](07_governance/adr_001_stack_and_runtime.md) | **Canonical** | Stack: Next.js 15, Vercel, Neon, Prisma v7, Resend, Blob |
| `prds/05_runtime/backend_requirements.md` | Planned | Web + jobs contours |
| `prds/05_runtime/monorepo_packages.md` | Planned | Workspaces, package boundaries |
| Lampto reference | Reference | [`backend_stack_decision.md`](../examples/lampto/docs/prds/05_runtime/backend_stack_decision.md) |

**Two-contour model:** Web (Vercel BFF) + Jobs (Vercel Cron / serverless on MVP).

---

# 8. Operations Layer

Purpose: **monitoring, migrations, production readiness**.

| Document | Status |
|----------|--------|
| `prds/06_operations/observability_plan.md` | Planned |
| `prds/06_operations/migration_runbook.md` | Planned |

---

# 9. Governance Layer

Purpose: **ADR, decision process, architectural evolution**.

| Document | Status | Purpose |
|----------|--------|---------|
| [`adr_001_stack_and_runtime.md`](07_governance/adr_001_stack_and_runtime.md) | **Accepted** | Stack and hosting decision |
| `07_governance/adr_index.md` | Planned | ADR registry |
| `07_governance/decision_process.md` | Planned | When and how to write ADRs |

---

# 10. Design Layer

| Document | Status | Purpose |
|----------|--------|---------|
| [`default_docs/fitness-platform-design-system.md`](../default_docs/fitness-platform-design-system.md) | Interim | Warm Forest tokens, typography, components |
| [`design/canonical_routes.md`](../design/canonical_routes.md) | **Canonical** | Routes |
| `design/styleguide.md` | Planned | Migrated from design system |
| `design/wireframes/mvp/` | Planned | Markdown wireframes per route |
| `design/wireframes/route_index.md` | Planned | Path → wireframe mapping |

---

# 11. Implementation Layer

| Path | Purpose |
|------|---------|
| `implementation/mvp/phases_tasks_descriptions/` | Phase goals and boundaries |
| `implementation/mvp/tasks/` | Agent checklists |
| `implementation/mvp/contracts/` | Cross-module contracts |
| `implementation/mvp/specs/` | Complex flow specs (booking wizard, trainer onboarding) |
| `implementation/mvp/guides/` | Env setup, deploy, migrations |

Lampto reference: [`docs/examples/lampto/docs/implementation/mvp/`](../examples/lampto/docs/implementation/mvp/).

---

# 12. Agent Onboarding — Recommended Reading Order

For a new AI agent session on Pulse:

1. [`AGENTS.md`](../../AGENTS.md)
2. [`.cursor/rules/pulse-project-context.mdc`](../../.cursor/rules/pulse-project-context.mdc)
3. [`docs/meta/ai_first_project_methodology.md`](../meta/ai_first_project_methodology.md)
4. [`docs/architecture_learning_pack/01_architecture_overview.md`](../architecture_learning_pack/01_architecture_overview.md)
5. [`docs/reference/lampto_project_reference.md`](../reference/lampto_project_reference.md)
6. [`docs/default_docs/fitness-platform-mvp.md`](../default_docs/fitness-platform-mvp.md)
7. [`docs/design/canonical_routes.md`](../design/canonical_routes.md)
8. Active phase: `implementation/mvp/phases_tasks_descriptions/P{N}_*.md` + contracts + tasks

---

# 13. Development Workflow Rules

1. **No architectural guessing** — read contracts and lampto analogs first.
2. **Thin adapters in `apps/`** — business logic in `packages/`.
3. **One route list** — `canonical_routes.md` only.
4. **Docs alignment** — behavior change = doc update in same task.
5. **Phases bound scope** — one phase per agent session when possible.
6. **Reference before invent** — [`lampto_project_reference.md`](../reference/lampto_project_reference.md).

---

# 14. Repository Layout (Target Monorepo)

```
fitapp/
├── AGENTS.md
├── apps/
│   ├── web/                 — Next.js 15 (not scaffolded yet)
│   └── workers/               — job entrypoints (planned)
├── packages/
│   ├── domain/
│   ├── policy/edge/
│   ├── policy/server/
│   └── db/
├── docs/                      — this tree
└── docs/examples/lampto/      — read-only reference (gitignored from deploy)
```

Package boundary rules: lampto [`monorepo_boundaries.md`](../examples/lampto/docs/implementation/mvp/monorepo_boundaries.md) until Pulse local copy exists.

---

# 15. Document Status Legend

| Label | Meaning |
|-------|---------|
| **Canonical** | Source of truth — update when behavior changes |
| Interim | Valid content in `default_docs/` — migrate to `prds/` |
| Planned | Directory exists; document not written yet |
| Reference | lampto only — patterns, not Pulse product rules |

---

*Navigation hub for Pulse. Update when new canonical documents are added.*
