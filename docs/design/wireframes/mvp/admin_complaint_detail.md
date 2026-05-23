# Wireframe: Admin Complaint Detail

**Тип:** Wireframe | **Статус:** Canonical | **Версия:** 1.0 | **Дата:** 2026-05-23 | **Волна:** W10  
**Route:** `/admin/complaints/[id]` · **Prototype:** —

## Metadata

| Field | Value |
|-------|--------|
| **Primary CTA** | Status transition (e.g. «Resolve» / «Escalate») |
| **Spec** | complaint_refund_spec |

## Components

Timeline/status `Badge`, detail `Card`, related booking link, `Textarea` admin notes, `Select` status, `Button`.

## Regions

1. **Complaint meta** — reporter, trainer, booking ref, priority.
2. **Description** — full text, attachments if any.
3. **Admin actions** — status change + internal note.
4. **Related refund** — link if exists → `/admin/refunds`.

## Guardrails

- Valid transitions only per lifecycle.
- PII minimization in display.

## States

| State | Description |
|-------|-------------|
| happy | Detail + actions |
| loading | Skeleton |
| error | Invalid transition toast |
| forbidden | Non-admin |

**Registry:** W10-27
