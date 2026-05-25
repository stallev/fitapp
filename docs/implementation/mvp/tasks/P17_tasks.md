# P17 Tasks — UI Internationalization (EN/RU)

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-25  
**Волна:** W24  
**Зависит от:** [`P17_phase_description.md`](../phases_tasks_descriptions/P17_phase_description.md)  
**Связанные документы:** [`adr_009_ui_locale_strategy.md`](../../../prds/07_governance/adr_009_ui_locale_strategy.md), [`i18n_runtime_spec.md`](../contracts/i18n_runtime_spec.md), [`copy_and_messages.md`](../../../guidelines/react/copy_and_messages.md)

---

## Purpose

Чеклист **P17** — locale platform: resolver, messages EN/RU, formatters, switcher UX, verification.

---

## 0. Gate

- [ ] ADR-009 status **ACCEPTED**
- [ ] P14 DoD complete (`npm run typecheck`, `npm run lint`, UI states audit)
- [ ] Read [`i18n_runtime_spec.md`](../contracts/i18n_runtime_spec.md) + [`P17_phase_description.md`](../phases_tasks_descriptions/P17_phase_description.md)

---

## Wave A — Foundation

- [ ] Create `@/lib/i18n/constants.ts` — `DEFAULT_LOCALE`, `SUPPORTED_LOCALES`, `AppLocale` type
- [ ] Create `@/lib/i18n/resolve-locale.ts` — priority chain per contract §3
- [ ] Create `@/lib/i18n/cookie.ts` — read/write `pulse_locale` (1y, `SameSite=Lax`, path `/`)
- [ ] Create `@/lib/messages/types.ts` — export `Messages` type from `en.ts` tree
- [ ] Create `@/lib/messages/en.ts` — canonical keys + EN values (pilot namespaces: `site`, `auth`, `nav`, `landing`)
- [ ] Refactor `@/lib/messages/ru.ts` — `satisfies Messages`
- [ ] Update `@/lib/messages/index.ts` — `getMessages(locale)`, deprecate bare `MESSAGES` export with migration note
- [ ] Root `layout.tsx` — `await resolveLocale()`; dynamic `<html lang={locale}>`
- [ ] Handle `?lang=en|ru` — set cookie + strip query (layout or dedicated helper)
- [ ] Pilot routes: `/`, `/auth/login` use `getMessages()`

---

## Wave B — Full copy

- [ ] Complete `en.ts` parity with `ru.ts` (all namespaces)
- [ ] Add `messages.locale.*` keys (switcher labels, settings row, language names)
- [ ] Grep audit: no inline Cyrillic user-visible strings in `apps/web/src` (exclude `ru.ts`, tests, seed)
- [ ] Migrate high-traffic imports: shell, booking, catalog, admin, trainer (batch by domain folder)
- [ ] Server Actions / DAL errors — `getMessages(locale)` or pass message key + resolve in UI
- [ ] Update `opengraph-image.tsx`, `landing-metadata.ts`, `landing-json-ld.ts` for per-locale metadata

---

## Wave C — Formatters

- [ ] Create `@/lib/i18n/format.ts` — `formatMoney`, `formatDateTime`, `formatRelative`, `getDateFnsLocale`, `getIntlLocale`
- [ ] Replace hardcoded `"ru-RU"` / `date-fns/locale/ru` in product code with formatter calls
- [ ] `DatePickerField.client.tsx` — locale from context/props
- [ ] Booking slot display — **UI locale** + **trainer timezone** (INV-01 unchanged)
- [ ] `format-money.ts` — delegate to `@/lib/i18n/format.ts` or merge

---

## Wave D — UX & persist

- [ ] Design Lab section — `LocaleSwitcher` variants (segmented EN|RU)
- [ ] `LocaleSwitcher.client.tsx` — `aria-pressed`, calls `setLocaleAction`
- [ ] Server Action `setLocaleAction` — validate locale; set cookie; update `user.locale` if session
- [ ] `LocaleProvider.client.tsx` + `useMessages()` for client components
- [ ] Marketing: `LandingNav` + `LandingFooter` — embed switcher
- [ ] App shell: `TopBar` `md+` — compact switcher (MAY hide on mobile; profile row required)
- [ ] `LocaleSettingsRow` — `/client/profile`, `/trainer/profile`
- [ ] Register client/trainer — persist `user.locale` from active locale at signup
- [ ] Login — cookie wins over DB for display (ADR-009 D6); no silent DB overwrite on login

---

## Wave E — Verification & docs

- [ ] `npm run typecheck` (root)
- [ ] `npm run lint` (root)
- [ ] Smoke: guest RU auto-detect (`Accept-Language: ru-RU`)
- [ ] Smoke: guest EN default (`Accept-Language: en-US`)
- [ ] Smoke: switcher EN ↔ RU on landing
- [ ] Smoke: `?lang=ru` deep link → cookie + stripped URL
- [ ] Smoke: client booking list + detail — dates/money both locales
- [ ] Smoke: trainer schedule — slot labels locale-aware, timezone correct
- [ ] Smoke: admin complaint detail — resolution labels EN/RU
- [ ] Smoke: profile language change persists after re-login
- [ ] Docs: matrix, canonical_routes, copy guide, wireframe, registry synced

---

## Agent anti-patterns (P17)

- **MUST NOT** introduce `/[lang]/` App Router segment without new ADR amendment
- **MUST NOT** add next-intl full routing without ADR amendment
- **MUST NOT** import `@pulse/policy-server` in locale resolver (server layout only; no proxy change required)
- **MUST NOT** mix UI locale with `TrainerProfile.timezone`
- **MUST** add new user-visible strings to **both** `en.ts` and `ru.ts` in same PR

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P17_phase_description.md`](../phases_tasks_descriptions/P17_phase_description.md) | DoD |
| [`ui_component_phase_matrix.md`](../ui_component_phase_matrix.md) | P17 row |

**Registry:** W24
