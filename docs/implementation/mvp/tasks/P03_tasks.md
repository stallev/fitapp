# P03 Tasks — Design System & App Shell

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 2.0  
**Дата:** 2026-05-23  
**Волна:** W16  
**Зависит от:** [`P03_phase_description.md`](../phases_tasks_descriptions/P03_phase_description.md)  
**Связанные документы:** [`global_shell_spec.md`](../specs/global_shell_spec.md), [`design_system_lab_spec.md`](../specs/design_system_lab_spec.md)

---

## Purpose

Чеклист **P03** — shell, route groups, messages, toast, Design Lab QA, placeholders.

---

## 1. Global shell

- [ ] Root layout: fonts, ThemeProvider, Toaster
- [ ] Route groups: `(public)`, `(client)`, `(trainer)`, `(admin)`, `(booking)`, `(session)`
- [ ] `AppShell`, `TopBar`, `BottomNav`, `SidebarNav`, `PageContainer`
- [ ] Nav config — role → items ([`global_shell_spec.md`](../specs/global_shell_spec.md))
- [ ] Warm Forest tokens in `globals.css`
- [ ] `@/lib/messages` + `product-toast.ts`

## 2. Design System Lab

- [x] Typography atoms in `components/atoms/`
- [x] `Button`, `CustomLink`, `PulseCard` in `components/ui/`
- [x] Dev-only `/design-system` + canonical_routes entry
- [ ] Visual QA: light + dark, 390px, prototype anchors

## 3. Placeholder pages

- [ ] Role dashboards with empty states
- [ ] `(booking)` / `(session)` layouts — stub children
- [ ] `/` — minimal hero (full content P04)

## 4. Verification

- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] Smoke: role shells render with nav
- [ ] Smoke: `/design-system` 390px/md
- [ ] **MUST NOT** import `design-lab/` in product routes

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P03_phase_description.md`](../phases_tasks_descriptions/P03_phase_description.md) | DoD |
| [`P04_tasks.md`](./P04_tasks.md) | Next — landing |

**Registry:** W16
