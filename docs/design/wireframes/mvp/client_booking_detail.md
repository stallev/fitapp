# Wireframe: Client Booking Detail

**Тип:** Wireframe | **Статус:** Canonical | **Версия:** 1.0 | **Дата:** 2026-05-23 | **Волна:** W10  
**Route:** `/client/bookings/[id]` · **Prototype:** —

## Metadata

| Field | Value |
|-------|--------|
| **Primary CTA** | Context: «Отменить» (if allowed) or «Оставить отзыв» (completed) |
| **Contract** | [`booking_lifecycle_contract.md`](../../../implementation/mvp/contracts/booking_lifecycle_contract.md) |

## Components

`Card`, `Badge`, `Button`, `AlertDialog` cancel confirm, `RedirectToast` query `?booked=1`.

## Regions

1. **Status header** — badge + timeline hint.
2. **Details** — trainer, service, time (client TZ display), price snapshot, note.
3. **Actions** — Cancel (destructive outline + confirm); Join session link → placeholder route.
4. **Review CTA** — if completed → `/client/reviews/[bookingId]`.

## Guardrails

- Object-level owner check (client_id).
- Cancel only valid transitions per lifecycle.

## States

| State | Description |
|-------|-------------|
| happy | Detail + actions |
| loading | Header skeleton |
| error | notFound / Alert |
| forbidden | IDOR → forbidden card |

**Registry:** W10-13
