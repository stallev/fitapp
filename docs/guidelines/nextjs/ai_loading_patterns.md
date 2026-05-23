# Next.js Loading Patterns — Pulse

**Version:** 1.0 · **Project:** Pulse `apps/web`  
**Stack:** Next.js **16.2.6** App Router, React 19, Vercel, Neon + Prisma v7  
**Methodology:** [`docs/meta/ai_first_project_methodology.md`](../../meta/ai_first_project_methodology.md)  
**Runtime:** [ADR-002](../../prds/07_governance/adr_002_next162_vercel_runtime_policy.md)  
**Cursor rule:** **app-router-streaming-loading**

Verify against Context7 `/vercel/next.js/v16.2.2` and [Loading UI and Streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming).

---

## 1. Overview

**Key principle:** On navigation, the new route **must appear immediately** — even if data is still loading. Use lightweight `page.tsx`, **`loading.tsx`**, and **Suspense** per independent data region.

**Vercel:** App Router **streaming** (HTML + RSC payload aligned with Suspense) is supported in production — not an Amplify-era limitation.

### 1.1 Streaming model

React delivers output **in chunks aligned with `<Suspense>` boundaries**:

- Early: layout, nav, fallbacks
- Later: resolved async Server Components

**Unit of progressive delivery:** Suspense boundary + RSC flight — not a single blocking `await` in `page.tsx`.

### 1.2 Data boundaries (“senior” framing)

- **Shell:** nav, titles, static chrome — no slow DB waits
- **Independent sources:** each gets its own Suspense (catalog filters vs trainer grid)
- **Bottleneck isolation:** move heavy `await` into child components

---

## 2. Mechanisms

### 2.1 `loading.tsx`

Place beside `page.tsx`. Next.js wraps the segment in Suspense automatically.

```
apps/web/src/app/
├── trainers/
│   ├── page.tsx
│   ├── loading.tsx
│   └── _components/
```

Skeleton should match page chrome (Warm Forest spacing).

### 2.2 Manual Suspense (within page)

**Anti-pattern:** heavy `await` at top of `page.tsx` blocks first paint.

**Recommended:** async children + `<Suspense fallback={<Skeleton />}>`.

```tsx
import { Suspense } from 'react'
import { TrainerGrid } from './_components/trainer-grid.server'
import { TrainerGridSkeleton } from './_components/trainer-grid-skeleton'

export default async function TrainersPage() {
  return (
    <div>
      <h1>…</h1>
      <Suspense fallback={<TrainerGridSkeleton />}>
        <TrainerGrid />
      </Suspense>
    </div>
  )
}
```

**Parallel boundaries:** sibling Suspense regions resolve independently.

### 2.3 Do not duplicate

Same full-page UI via both `loading.tsx` **and** outer Suspense wrapping identical content.

---

## 3. `page.tsx` responsibilities

1. `await params` / `searchParams` (Next.js 16 async APIs)
2. Fast `auth()` + redirect/notFound
3. Static shell + Suspense children
4. **No** long `Promise.all` of unrelated queries at top level

---

## 4. Error boundaries

Pair data-heavy Suspense with `error.tsx` where failures are expected (admin lists, booking detail).

---

## 5. Mutation loading vs route loading

| Type | Mechanism |
|------|-----------|
| **Route navigation** | `loading.tsx`, Suspense fallbacks |
| **Form/button mutation** | `useTransition` / `useActionState` — [ai_form_handling_pattern.md](../react/ai_form_handling_pattern.md) §4 |

Do not use route skeletons for button pending states.

---

## 6. Pulse route examples

| Route | Pattern |
|-------|---------|
| `/trainers` | Shell + Suspense grid; filters may be static or separate Suspense |
| `/client/bookings` | Upcoming / past — two Suspense regions |
| `/trainer/dashboard` | KPI shell + Suspense upcoming sessions |
| `/admin/trainers/pending` | `loading.tsx` + table Suspense |

---

## 7. AI assistant checklist (mandatory)

Before finishing route work:

- [ ] Independent DB regions → separate Suspense + matching skeletons
- [ ] New data-heavy route → `loading.tsx` unless documented exception
- [ ] `page.tsx` stays light (params, auth, shell)
- [ ] No duplicate loading UI (`loading.tsx` + identical outer Suspense)
- [ ] Error story for fallible regions
- [ ] Verify on **Vercel preview** when available

---

**Reference:** lampto [`ai_loading_patterns.md`](../../examples/lampto/docs/guidelines/nextjs/ai_loading_patterns.md) — adapted Netlify → Vercel, ADR-002.

**Last updated:** May 2026
