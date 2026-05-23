# React component guidelines — Pulse

**Stack:** Next.js **16.2.6** App Router, React 19, shadcn/ui, Warm Forest tokens  
**Methodology:** [`docs/meta/ai_first_project_methodology.md`](../../meta/ai_first_project_methodology.md)  
**Cursor rules:** **react-ui-components**, **react-one-component-per-file**, **ui-warm-forest-shadcn**

---

## 1. Server vs client

- **Default:** Server Component — no `'use client'`
- **Client:** hooks, events, browser APIs only
- New client modules: **`.client.tsx`** suffix for clarity

---

## 2. Props and exports

- Explicit **`interface Props`** or inline type; **no `React.FC`**
- Arrow components for features: `export const TrainerCard = (props: Props) => …`
- **One component per file** (except page/layout default exports); **target ≤ 140 lines** — split when larger
- Named exports; avoid deep `index.ts` re-export chains

---

## 2.1 Logic vs presentation

| Layer | Location | Responsibility |
|-------|----------|----------------|
| Data | `src/data/**`, composition | Fetch, policy, domain |
| RSC shell | `page.tsx`, `*.server.tsx` | Guards + serializable props |
| Client | `*.client.tsx` | Mutations, events, hooks |
| Presentational | skeletons, cards, atoms | Props → JSX only |

**Forbidden:** same module fetches data **and** uses `useActionState`. Cursor rule: **react-logic-presentation**.

---

## 2.2 Shared components

- Search `components/ui/`, `components/atoms/`, domain folders **before** new JSX.
- Reuse on 2+ routes → extract shared component (named export, one file).
- Routes stay thin — compose features, do not embed large UI trees.

---

## 3. Styling

- **`cn()`** + **cva** for variants
- Semantic tokens from [`fitness-platform-design-system.md`](../../default_docs/fitness-platform-design-system.md)
- **Mobile-first** — base = mobile; `md:` / `lg:` expand (see **ui-mobile-first**, design system §2)
- **Prototype fidelity** — fonts, sizes, weights, colors from [`Fitness_Platform_Prototype_v1.html`](../../prototypes/Fitness_Platform_Prototype_v1.html) + design system (**ui-prototype-fidelity**)

---

## 4. shadcn/ui workflow

1. Search shadcn MCP / registry before custom primitives
2. Install to `components/ui/`
3. Tokenize with Warm Forest CSS variables in `globals.css`

---

## 5. React Compiler

When `reactCompiler: true`:

- Do **not** add `memo` / `useCallback` / `useMemo` without measured need
- Follow [Rules of React](https://react.dev/reference/rules) — violations disable optimization
- Run `npm run lint -w web` before finishing UI work

---

## 6. Feature folder layout

```
components/
  ui/           # shadcn primitives
  booking/      # booking-specific
  trainer/      # trainer dashboard
  admin/        # moderation tables
```

Routes stay thin — data in `src/data/**`, actions in `src/actions/**`.

---

## 7. Accessibility & semantic markup

**Cursor rule:** **ui-semantics-a11y** · **Guide:** [ai_semantics_a11y_guidelines.md](./ai_semantics_a11y_guidelines.md)  
**Target:** WCAG 2.1 Level AA

### Semantic HTML

- Landmarks: `main`, `nav`, `header`, `footer`; one `h1` per page
- Native controls: `button`, `a`, `label`+`input` — not `div onClick`
- Lists/tables: proper `ul`/`ol`/`table` for repeated data and admin grids

### A11y

- Keyboard navigation for dialogs/sheets (Radix/shadcn)
- Visible focus rings (`focus-visible:ring-ring`)
- `aria-label` on icon-only buttons; `aria-hidden` on decorative icons
- `aria-invalid` + `FieldError` on forms; `aria-busy` on mutations (**ui-mutation-pending**)
- Contrast AA in light and dark; touch targets ≥ 44px (**ui-mobile-first**)

**Reference:** lampto [`ai_component_guidelines.md`](../../examples/lampto/docs/guidelines/react/ai_component_guidelines.md) §8
