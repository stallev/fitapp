# Wireframe: Client Bookings List

**Тип:** Wireframe | **Статус:** Canonical | **Версия:** 1.0 | **Дата:** 2026-05-23 | **Волна:** W10  
**Route:** `/client/bookings` · **Prototype:** `c.bookings`

## Metadata

| Field | Value |
|-------|--------|
| **Primary CTA** | Row tap → `/client/bookings/[id]` |
| **Flow** | client_flow § Bookings |

## Components

`Tabs` (Upcoming | Past | Cancelled), booking row `Card`, status `Badge`, `Skeleton`.

## Regions

1. **Page title** — «Мои сессии».
2. **Tabs** — filter by status group.
3. **List** — trainer avatar, service, datetime, status badge, chevron.

## States

| State | Description |
|-------|-------------|
| happy | Tab list |
| empty | Per-tab empty + «Найти тренера» |
| loading | Row skeletons × 5 |
| error | Alert + Retry |
| forbidden | Non-client |

## Mobile / Desktop

Same structure; desktop wider rows, optional table-like layout md+.

**Registry:** W10-12
