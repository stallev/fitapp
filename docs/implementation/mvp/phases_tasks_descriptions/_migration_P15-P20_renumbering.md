# Migration — Phase Renumbering P15/P20 → P16/P17/P21 (W22)

**Тип:** Migration note  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-25  
**Волна:** W22  
**Предшествует:** [`_migration_P01-P07_to_P01-P15.md`](./_migration_P01-P07_to_P01-P15.md)

---

## Purpose

Зафиксировать перенумерацию post-P14 фаз и введение **P16 Public Landing v2** без потери истории P04 (MVP landing) и W16–W18 документации.

**Аудитория:** AI-агенты, product, ops.

---

## Renumbering table

| Old ID | New ID | Title | Notes |
|--------|--------|-------|-------|
| **P15** | **P21** | Email & Jobs *(post-MVP)* | Backend jobs only; deferral gate unchanged |
| **P20** | **P17** | Complaint Resolution v2 | ADR-008; in-progress implementation keeps checked tasks |
| *(planned P16 in spec)* | **P18** | Admin People Ops | `admin_people_ops_spec.md` — phase number only |
| *(new)* | **P16** | Public Landing v2 | Full replace `/` per standalone prototype |
| P17–P19 *(reserved)* | **P19** | Reserved | P16/P17/P18 now allocated |

**Unchanged:** P01–P14 (including historical **P04** MVP landing — superseded visually by **P16**, not renumbered).

---

## File renames (git mv)

| From | To |
|------|-----|
| `P15_phase_description.md` | `P21_phase_description.md` |
| `P15_tasks.md` | `P21_tasks.md` |
| `P20_phase_description.md` | `P17_phase_description.md` |
| `P20_tasks.md` | `P17_tasks.md` |

**New files (W22):**

| File | Purpose |
|------|---------|
| `P16_phase_description.md` | Public Landing v2 |
| `P16_tasks.md` | Landing v2 checklist |
| `specs/public_landing_spec.md` | Canonical landing spec |
| `_migration_P15-P20_renumbering.md` | This document |

---

## Cross-reference sweep (mandatory)

After renumbering, update **all** occurrences:

| Pattern | Replace with |
|---------|--------------|
| `P15_phase_description` / `P15_tasks` (email context) | `P21_*` |
| `P20_phase_description` / `P20_tasks` (complaints) | `P17_*` |
| `P16` (admin people ops in specs/wireframes) | `P18` |
| «P17–P19 reserved» | «P19 reserved» + list P16/P17/P18 |
| Registry W16-only phase list | Add W22 rows |

**High-touch files:** `documentation_creation_registry.md`, `AGENTS.md`, `pulse-project-context.mdc`, `ui_component_phase_matrix.md`, `architecture_master_index.md`, `adr_008_complaint_resolution_model.md`, `complaint_refund_spec.md`, `admin_people_ops_spec.md`, `admin_flow.md`, wireframes W10-30…32, `prototype_route_mapping.md`, `public_landing.md`.

---

## Agent rules

1. **One session = one phase** — do not mix P16 landing replace with P17 complaint work.
2. **P04 is historical** — do not edit P04 DoD retroactively; P16 explicitly **DELETE + CREATE** landing components.
3. **Email deferral** — still references **P21**, not P15.
4. **Branch/commit messages** mentioning P20 may map to P17 for complaints scope only.

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P16_phase_description.md`](./P16_phase_description.md) | New landing phase |
| [`P17_phase_description.md`](./P17_phase_description.md) | Was P20 |
| [`P21_phase_description.md`](./P21_phase_description.md) | Was P15 |
| [`documentation_creation_registry.md`](../../../meta/documentation_creation_registry.md) | W22 registry |

**Registry:** W22
