# UI Component Phase Matrix

**Тип:** Implementation matrix  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-23  
**Волна:** W16  
**Источник:** [`design_system_lab_spec.md`](specs/design_system_lab_spec.md) § Component inventory  
**Связанные документы:** [`_phase_template.md`](phases_tasks_descriptions/_phase_template.md), [`global_shell_spec.md`](specs/global_shell_spec.md)

---

## Purpose

Канон **Phase × Component × Route × Action (CREATE / USE)** для AI-агентов. Агент читает **только строки своей фазы** + shared USE primitives.

**Import paths:** `@/components/atoms`, `@/components/ui/*`, `@/components/shell/*`, `@/components/{catalog|booking|trainer|admin}/*`

**MUST NOT:** import from `@/components/design-lab/**` in product routes.

---

## Legend

| Action | Meaning |
|--------|---------|
| **CREATE** | New component or route-specific module in this phase |
| **USE** | Compose from existing catalog; tokenize/extend via CVA if needed |
| **MUST NOT** | Explicit anti-scope for this phase |

---

## P01 — Monorepo & Data Layer

| Component | Action | Route | Notes |
|-----------|--------|-------|-------|
| — | — | — | **No product UI** — packages + Prisma only |

---

## P02 — Auth & Request Guards

| Component | Action | Route | Notes |
|-----------|--------|-------|-------|
| `Button` | USE | `/auth/login`, `/auth/register` | Submit + pending |
| `Input`, `Field`, `Label` | USE | auth forms | Generic login errors |
| `Checkbox` | USE | `/auth/register` | Terms acceptance |
| `Container` | USE | auth pages | Mobile-first |
| `ContentText`, `AlertText` | USE | auth forms | `@/lib/messages` |
| `Heading` | USE | auth pages | One `h1` per view |
| Trainer wizard | MUST NOT | — | → **P10** |

---

## P03 — Design System & App Shell

| Component | Action | Route | Notes |
|-----------|--------|-------|-------|
| `AppShell` | CREATE | all role groups | Landmarks `nav`, `main` |
| `AppTopBar` / `TopBar` | CREATE | authenticated | Sticky, safe-area |
| `BottomNav` | CREATE | `< md` client/trainer | `aria-current` |
| `SideNav` / `SidebarNav` | CREATE | `≥ md` | Distinct `aria-label` |
| `NavItem` | CREATE | shell | 44px touch |
| `PageContainer` | CREATE | shell wrapper | Per global_shell_spec |
| Typography atoms | USE | placeholders | Already in repo |
| `Button`, `PulseCard`, `CustomLink` | USE | placeholders | Verify Lab |
| `/design-system` | USE | dev-only | Lab QA 390px/md/light/dark |
| Domain molecules | MUST NOT | — | → P04+ |

---

## P04 — Public Landing

| Component | Action | Route | Notes |
|-----------|--------|-------|-------|
| Landing section modules | CREATE | `/` | Hero, categories, featured |
| `SectionTitle`, `ContentText` | USE | `/` | Marketing copy |
| `PulseCard`, `Button`, `CustomLink` | USE | `/` | Primary CTA → `/trainers` |
| `SpecChip` | USE | `/` | Category chips |
| `TrainerCard` | USE | `/` | Featured row (fixture OK) |
| `SearchTrigger` | USE | `/` | Optional nav affordance |
| Catalog filters | MUST NOT | — | → **P05** |

---

## P05 — Catalog Discovery

| Component | Action | Route | Notes |
|-----------|--------|-------|-------|
| `TrainerCard` | CREATE | `/trainers` | Wishlist slot stub → P06 |
| `FilterSheet` / filter sidebar | CREATE | `/trainers` | URL searchParams |
| `FilterChip` | USE | `/trainers` | Mobile chips |
| `RadioGroup` tile | USE | `/trainers` | Desktop filters |
| `Slider` | USE | `/trainers` | Max price |
| `Pagination` | USE | `/trainers` | Shareable page |
| `Empty`, `Skeleton` | USE | `/trainers` | FX-8 empty CTA |
| `Sheet` | USE | `/trainers` | Mobile filters `< md` |
| Profile tabs | MUST NOT | — | → **P06** |

---

## P06 — Trainer Public Profile + Wishlist

| Component | Action | Route | Notes |
|-----------|--------|-------|-------|
| Profile tab panels | CREATE | `/trainers/[id]` | Split ≤140 lines/file |
| Wishlist heart control | CREATE | `/trainers/[id]`, card | Optimistic per contract |
| `Tabs` | USE | profile | About / Services / Schedule / Reviews |
| `RatingStars`, `SpecChip`, `PhotoSlot` | USE | profile | |
| `StatusBadge`, `VerifiedBadge` | USE | profile | |
| `Button` | USE | profile | Primary «Book now» |
| Booking wizard | MUST NOT | — | → **P07** |

---

## P07 — Booking Wizard

| Component | Action | Route | Notes |
|-----------|--------|-------|-------|
| `BookingWizard` | CREATE | `/book/[trainerId]` | 3 steps |
| Schedule grid wrapper | CREATE | wizard step 2 | TZ label |
| `WizardHeader`, `Progress` | USE | booking layout | Stripped chrome |
| `ChoiceCard`, `SummaryCard` | USE | wizard | |
| `SchedulePicker`, `DayPill`, `TimeSlotButton` | USE | step 2 | |
| `MetaRow`, `Textarea`, `Field` | USE | confirm step | |
| `RedirectToast` pattern | USE | post-booking | Query `?booked=1` |
| Payment UI | MUST NOT | — | ADR-005 |

---

## P08 — Client Bookings Hub

| Component | Action | Route | Notes |
|-----------|--------|-------|-------|
| `BookingListItem` | CREATE | `/client/bookings` | Status + compact card |
| Dashboard widgets | CREATE | `/client/dashboard` | Next session, shortcuts |
| `PulseCardKpi` | USE | dashboard | |
| `StatusBadge` | USE | bookings | |
| `AlertDialog` | USE | booking detail | Cancel confirm |
| `Tabs` | USE | bookings list | Upcoming / Past / Cancelled |
| Review form | MUST NOT | — | → **P09** |

---

## P09 — Client Reviews

| Component | Action | Route | Notes |
|-----------|--------|-------|-------|
| `ReviewForm` | CREATE | `/client/reviews/[bookingId]` | |
| `RatingStars` (interactive) | USE | review form | Required |
| `Textarea`, `Button` | USE | review form | Pending UI |
| Completed booking | USE (data) | — | Seed/manual from **P12** OK for smoke |

---

## P10 — Trainer Onboarding

| Component | Action | Route | Notes |
|-----------|--------|-------|-------|
| Onboarding step components | CREATE | `/auth/register/trainer` | 5 steps, ≤140 lines |
| `WizardHeader`, `Progress` | USE | onboarding | |
| `PhotoSlot`, `FileUploadZone` | USE | steps 1, 3 | Blob contract |
| `Field`, `Select`, `Checkbox` | USE | all steps | **timezone required** |
| `ChoiceCard` / service draft | USE | step 4 | Skip allowed |
| Admin approve UI | MUST NOT | — | → **P13** |

---

## P11 — Trainer Profile & Services

| Component | Action | Route | Notes |
|-----------|--------|-------|-------|
| `ServiceCard` | CREATE | `/trainer/services` | Active toggle |
| Blob upload flows | USE | `/trainer/profile` | Photo, certs |
| `Switch` | USE | services | Optimistic optional |
| `Field`, `Textarea` | USE | profile edit | |
| Schedule editor | MUST NOT | — | → **P12** |

---

## P12 — Trainer Schedule & Clients

| Component | Action | Route | Notes |
|-----------|--------|-------|-------|
| `ClientListCard` | CREATE | `/trainer/clients` | Search + empty |
| Schedule editor modules | CREATE | `/trainer/schedule` | Weekly + exceptions |
| `ScheduleDayPickerRow`, `DayPill` | USE | schedule | |
| `Calendar` | USE | exceptions | |
| `KeyValueRow`, `PulseCardKpi` | USE | dashboard, income | |
| Mark booking `completed` | CREATE (action) | client detail | Enables **P09** |
| Admin queues | MUST NOT | — | → **P13** |

---

## P13 — Admin Moderation

| Component | Action | Route | Notes |
|-----------|--------|-------|-------|
| `ModerationQueueRow` | CREATE | `/admin/trainers`, etc. | Approve/Reject hierarchy |
| Admin table rows | CREATE | complaints, refunds, reviews | |
| `PageHeader` | USE | admin lists | |
| `StatusBadge`, `IconBadge` | USE | nav badges | |
| Confirm dialogs | USE | reject, hide review | |
| Admin forms layout | USE | detail pages | **admin-forms-layout** rule |
| Client complaint/refund entry | CREATE/USE | booking detail | If not in P08 |

---

## P14 — Quality Gate

| Component | Action | Route | Notes |
|-----------|--------|-------|-------|
| All prior CREATE | USE (audit) | all P01–P13 routes | Fix gaps only |
| New components | MUST NOT | — | No new features |

---

## P15 — Email & Jobs *(post-MVP)*

| Component | Action | Route | Notes |
|-----------|--------|-------|-------|
| Password reset UI | CREATE (optional) | `/auth/forgot-password` | Per password_reset_spec |
| Product UI otherwise | MUST NOT | — | Backend jobs only |

---

## Shared USE primitives (all product phases)

Available from P03 onward unless phase table says **MUST NOT**:

| Layer | Examples |
|-------|----------|
| Atoms | `Heading`, `SectionTitle`, `ContentText`, `AlertText` |
| UI | `Button`, `CustomLink`, `PulseCard`, `Container`, `Skeleton`, `Empty` |
| Shell | `AppShell`, nav components (P03+) |
| Messages | `@/lib/messages`, `product-toast.ts` |

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`design_system_lab_spec.md`](specs/design_system_lab_spec.md) | Full inventory + FAANG contract |
| [`_migration_P01-P07_to_P01-P15.md`](phases_tasks_descriptions/_migration_P01-P07_to_P01-P15.md) | Phase renumbering |
| [`global_shell_spec.md`](specs/global_shell_spec.md) | Shell CREATE details (P03) |

**Registry:** [`documentation_creation_registry.md`](../../meta/documentation_creation_registry.md) — W16
