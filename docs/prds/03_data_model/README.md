# 03_data_model

Каноническая модель данных Pulse (PostgreSQL 17 / Neon / Prisma v7).

**Methodology:** [`docs/meta/ai_first_project_methodology.md`](../../meta/ai_first_project_methodology.md)

| Document | Status |
|----------|--------|
| [`database_schema_v1.md`](./database_schema_v1.md) | **Canonical** — DDL contract for Wave 1 MVP |
| `data_access_patterns.md` | Planned |
| `indexing_strategy.md` | Planned |

**Implementation:** `packages/db/prisma/schema.prisma` (on scaffold) must match `database_schema_v1.md`.

**Reference layering:** lampto [`database_schema_v3.md`](../../examples/lampto/docs/prds/03_data_model/database_schema_v3.md)
