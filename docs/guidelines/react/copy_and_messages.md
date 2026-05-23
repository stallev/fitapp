# UI copy and messages — Pulse

All user-visible product copy for **`apps/web`** lives in **`apps/web/src/lib/messages`**, starting with **`ru.ts`** (default locale). Keys use **English identifiers**; values are the current user language (Russian for MVP).

**Methodology:** [`docs/meta/ai_first_project_methodology.md`](../../meta/ai_first_project_methodology.md)  
**Cursor rule:** **ui-messages-and-copy** (`.cursor/rules/ui-messages-and-copy.mdc`)

---

## Why

- Single place to edit wording and add **i18n** later (same key tree → JSON or next-intl).
- **Server Actions** and **components** must not diverge on the same validation or error text.

---

## Structure

Nested objects by domain:

| Namespace | Examples |
|-----------|----------|
| `site` | App name, default metadata |
| `auth` | Login, register, password reset |
| `booking` | Status labels, actions, errors |
| `trainer` | Onboarding, schedule, services |
| `admin` | Moderation, verification, reject reasons |
| `catalog` | Filters, empty states, wishlist |

- **Validation** vs **server** errors separated where helpful (`booking.validation`, `booking.server`).
- **Enum/API values** (`client`, `pending`, `confirmed`) — `@pulse/domain` or `@/lib/...` constants; **labels** in `messages`.
- **Mutation pending labels** — short gerund-style (“Saving…”, “Booking…”) under `messages`. See [`ai_form_handling_pattern.md`](./ai_form_handling_pattern.md) §4.

---

## Agent rule

- Import `MESSAGES` (or scoped exports) from `@/lib/messages`.
- No duplicate strings in DAL, actions, and UI for the same user-facing error.

---

## Icons

Prefer **`lucide-react`** — **ui-icons-lucide** rule and [React README](./README.md).

**Reference:** lampto [`copy_and_messages.md`](../../examples/lampto/docs/guidelines/react/copy_and_messages.md)
