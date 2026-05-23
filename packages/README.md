# packages/

Shared monorepo packages — границы как в lampto.

| Package | Назначение |
|---------|------------|
| `domain/` | Pure business rules, use-cases, ports |
| `policy/edge/` | JWT-only checks for middleware |
| `policy/server/` | Object-level ACL with Prisma |
| `db/` | Prisma schema, repositories |

**Статус:** каталоги зарезервированы, код не создан.

**Reference:** [`docs/examples/lampto/docs/implementation/mvp/monorepo_boundaries.md`](../docs/examples/lampto/docs/implementation/mvp/monorepo_boundaries.md)
