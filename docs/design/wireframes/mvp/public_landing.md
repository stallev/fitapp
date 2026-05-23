# Wireframe: Public Landing

**Тип:** Wireframe | **Статус:** Canonical | **Версия:** 1.0 | **Дата:** 2026-05-23 | **Волна:** W10  
**Зависит от:** [`pages_functional_spec.md`](../../../prds/01_product_scope/pages_functional_spec.md), [`prototype_route_mapping.md`](../../prototype_route_mapping.md)  
**Route:** `/` · **Group:** `(public)` · **Role:** public · **Prototype:** — (gap)

## Metadata

| Field | Value |
|-------|--------|
| **Primary CTA** | «Найти тренера» → `/trainers` |
| **Secondary CTA** | «Стать тренером» → `/auth/register/trainer` |
| **Spec** | pages_functional_spec § Public |

## Components

`Button`, `Card`, `Badge` (trust chips), `SectionHeader` — [`styleguide.md`](../../styleguide.md).

## Regions

1. **Hero** — `font-heading` headline, subcopy, dual CTAs (stack mobile / row md+).
2. **Value props** — 3 cards grid (`grid-cols-1 md:grid-cols-3`).
3. **Featured trainers** — horizontal scroll mobile / 3-col grid md+ (approved only).
4. **Footer** — links Login, Register, legal placeholders.

## Data dependencies

Optional: `featuredTrainers` (approved, limit 6). Static marketing copy from `@/lib/messages`.

## Guardrails

- No auth required; no role nav.
- No payment/video CTAs (post-MVP).

## States

| State | Description |
|-------|-------------|
| happy | Hero + featured trainers |
| empty | Featured section hidden if zero trainers |
| loading | Featured row skeleton cards |
| error | Featured section Alert + Retry; hero static |
| forbidden | N/A |

## Desktop

```
┌──────────────────────────────────────────────────────┐
│ TopBar · Logo · Login · Register                     │
├──────────────────────────────────────────────────────┤
│ HERO (centered max-w-3xl)                            │
│ [Найти тренера]  [Стать тренером]                    │
│ Value props · 3 cards                                │
│ Featured trainers grid                               │
│ Footer                                               │
└──────────────────────────────────────────────────────┘
```

## Mobile

```
┌────────────────────┐
│ TopBar             │
│ Hero full-width    │
│ CTAs stack         │
│ Value cards stack  │
│ Trainers scroll →  │
│ Footer             │
└────────────────────┘
```

## Acceptance criteria

- [ ] Primary CTA → `/trainers`
- [ ] No bottom nav (public layout)
- [ ] Tokens via semantic classes only

## Related documents

| Document | Relationship |
|----------|--------------|
| [`route_index.md`](../route_index.md) | Index |

**Registry:** W10-02
