# P11 Tasks — Trainer Profile & Services

**Тип:** Tasks  
**Статус:** Canonical  
**Версия:** 2.0  
**Дата:** 2026-05-23  
**Волна:** W16  
**Зависит от:** [`P11_phase_description.md`](../phases_tasks_descriptions/P11_phase_description.md)  
**Связанные документы:** [`file_upload_contract.md`](../contracts/file_upload_contract.md)

---

## Purpose

Чеклист **P11** — trainer profile edit + services CRUD.

---

## 1. Trainer profile

- [ ] `/trainer/profile` edit fields per spec
- [ ] Blob upload photo/certs
- [ ] Save toasts + pending UI

## 2. Services

- [ ] `/trainer/services` CRUD
- [ ] `ServiceCard` component
- [ ] Active/hidden toggle — optimistic optional; `toast.error` on fail

## 3. Verification

- [ ] `npm run typecheck`
- [ ] `npm run lint -w web`
- [ ] Smoke: service CRUD
- [ ] Smoke: MIME/size upload errors
- [ ] **MUST NOT** schedule editor (→ P12)

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`P11_phase_description.md`](../phases_tasks_descriptions/P11_phase_description.md) | DoD |
| [`P12_tasks.md`](./P12_tasks.md) | Next — schedule |

**Registry:** W16
