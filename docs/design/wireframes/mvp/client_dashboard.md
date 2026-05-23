# Wireframe: Client Dashboard

**Тип:** Wireframe | **Статус:** Canonical | **Версия:** 1.0 | **Дата:** 2026-05-23 | **Волна:** W10  
**Route:** `/client/dashboard` · **Prototype:** `c.home`

## Metadata

| Field | Value |
|-------|--------|
| **Primary CTA** | «Найти тренера» or next session card tap |
| **Flow** | client_flow § Dashboard |

## Components

`Card`, search entry, category chips, next session row, `Skeleton`, BottomNav + Sidebar.

## Regions

1. **Greeting** — «Привет, {name}».
2. **Next session** — card or empty + CTA book.
3. **Search** — input → `/trainers?q=`.
4. **Categories** — horizontal chips (Yoga, HIIT…).
5. **Tip card** — optional sidebar md+.

## States

| State | Description |
|-------|-------------|
| happy | Content sections |
| empty | Welcome empty — no bookings yet |
| loading | KPI + card skeletons |
| error | Section-level Retry |
| forbidden | Non-client redirect |

## Desktop

`md:grid-cols-3` — main 2 col + sidebar 1 col.

## Mobile

Single column `space-y-6 pb-6` above BottomNav.

**Registry:** W10-11
