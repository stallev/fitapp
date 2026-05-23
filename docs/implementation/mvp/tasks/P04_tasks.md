# P04 Tasks — Public Landing

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 2.0  
**Дата:** 2026-05-23  
**Волна:** W16  
**Зависит от:** [`P04_phase_description.md`](../phases_tasks_descriptions/P04_phase_description.md)  
**Связанные документы:** [`catalog_discovery_spec.md`](../specs/catalog_discovery_spec.md)

---

## Purpose

Чеклист **P04** — landing `/` only.

---

## 1. Landing `/`

- [ ] Hero, value props, category chips per wireframe W10-02
- [ ] Featured trainers section (approved only or fixture)
- [ ] Primary CTA → `/trainers`
- [ ] Landing section components (≤140 lines/file)
- [ ] Responsive: mobile-first
- [ ] `loading.tsx` skeleton where async
- [ ] Copy from `@/lib/messages`

## 2. Verification

- [ ] `npm run typecheck`
- [ ] `npm run lint -w web`
- [ ] Smoke: CTA → `/trainers`
- [ ] One primary CTA on page
- [ ] **MUST NOT** implement `/trainers` catalog in this PR

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P04_phase_description.md`](../phases_tasks_descriptions/P04_phase_description.md) | DoD |
| [`P05_tasks.md`](./P05_tasks.md) | Next — catalog |

**Registry:** W16
