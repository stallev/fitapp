# Next.js Data Access: Server Actions vs Route Handlers (Pulse)

**Version:** 1.1 · **Stack:** Next.js **16.2.6** App Router, React 19, Prisma v7, Neon, Vercel  
**Methodology:** [`docs/meta/ai_first_project_methodology.md`](../../meta/ai_first_project_methodology.md)  
**Runtime:** [ADR-002](../../prds/07_governance/adr_002_next162_vercel_runtime_policy.md)  
**Reference:** lampto [`ai_nextjs_db_data_handle.md`](../../examples/lampto/docs/guidelines/nextjs/ai_nextjs_db_data_handle.md)

AI agents **MUST** follow this when implementing data access or mutations.

---

## 1. Key difference: automatic re-render

### Server Action → re-renders Server Components on current page (cannot disable).

### Route Handler + `fetch()` → JSON only, no automatic RSC re-render.

---

## 2. When to use which

| Scenario | Prefer |
|----------|--------|
| Form submit; list/detail refresh | **Server Action** |
| Optimistic toggle (wishlist, service active) | **Route Handler** or Action + targeted invalidation |
| JSON/polling | **Route Handler** |

---

## 3. DAL pattern

- Mutations → `apps/web/src/data/**` + `import "server-only"`
- Actions → thin wrappers + `revalidatePath` / `revalidateTag` / **`updateTag`** (read-your-own-writes in Server Actions, Next.js 16)

---

## 4. Async Request APIs (Next.js 16.2.6)

```ts
const cookieStore = await cookies();
const headersList = await headers();

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
}
```

---

## 5. Request interception (not in DAL)

Route protection lives in **`proxy.ts`**, not in Server Actions. See [ADR-002](../../prds/07_governance/adr_002_next162_vercel_runtime_policy.md).

---

## 6. Related rules

- [`data-server-actions-and-api.mdc`](../../../.cursor/rules/data-server-actions-and-api.mdc)
- [`nextjs-vercel-app-router.mdc`](../../../.cursor/rules/nextjs-vercel-app-router.mdc)
