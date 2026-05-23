# Wireframe: Client Profile

**Тип:** Wireframe | **Статус:** Canonical | **Версия:** 1.0 | **Дата:** 2026-05-23 | **Волна:** W10  
**Route:** `/client/profile` · **Prototype:** `c.profile`

## Metadata

| Field | Value |
|-------|--------|
| **Primary CTA** | «Выйти» (sign out) — or save if editable fields |
| **Flow** | client_flow § Profile |

## Components

`Card`, `Avatar`, `Button`, settings rows, theme toggle, sign out.

## Regions

1. **Profile header** — avatar, name, email (read-only MVP).
2. **Settings list** — notifications prefs placeholder, theme, language stub.
3. **Account** — sign out destructive outline.
4. **Wishlist link** — optional row → trainers with hearts (MAY defer P03).

## States

| State | Description |
|-------|-------------|
| happy | Settings list |
| loading | Row skeletons |
| error | toast on signOut fail |
| forbidden | Non-client |

## Layout

List-style mobile; desktop `max-w-lg` centered or full width in shell.

**Registry:** W10-15
