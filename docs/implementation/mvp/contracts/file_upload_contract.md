# File Upload Contract — Pulse MVP

**Тип:** Contract  
**Статус:** Canonical  
**Версия:** 1.0  
**Дата:** 2026-05-23  
**Волна:** W8  
**Зависит от:** [`adr_007_file_asset_blob_lifecycle.md`](../../../prds/07_governance/adr_007_file_asset_blob_lifecycle.md), [`authorization_matrix.md`](../../../prds/04_authorization_privacy/authorization_matrix.md)  
**Связанные документы:** [`trainer_verification_contract.md`](./trainer_verification_contract.md)

**Context7 verified:** Vercel Blob — `@vercel/blob/client` `upload()` + server `handleUpload()` with `onBeforeGenerateToken` / `onUploadCompleted`; `BLOB_READ_WRITE_TOKEN` server-only.

---

## Purpose

Контракт **загрузки файлов** через `file_asset` + Vercel Blob: initiate → client upload → confirm → link FK. Implements **INV-11**, [`FM-012`](../../../prds/02_domain_model/failure_modes_catalog.md#fm-012).

---

## Scope / Out of scope

**In scope:** Profile photo, trainer certificates (public), verification documents (private), Route Handler `/api/upload`.

**Out of scope:** Virus scan, S3, image CDN transforms, orphan GC cron (post-MVP).

---

## Definitions

| `upload_status` | Meaning |
|-----------------|---------|
| `pending` | Row created; bytes not confirmed |
| `ready` | Blob verified; FK allowed |
| `failed` | Error/timeout |

| `purpose` | Access | Max size |
|---------|--------|----------|
| `profile_photo` | public | 5 MB |
| `certificate` | public | 10 MB |
| `verification_doc` | private | 10 MB |

MIME allowlist: `image/jpeg`, `image/png`, `image/webp`, `application/pdf` (purpose-specific subset).

---

## Happy path

**Actor:** trainer uploading certificate during onboarding.

**Preconditions:** Authenticated trainer; policy allow.

**Sequence:**

```mermaid
sequenceDiagram
  participant UI as UploadForm
  participant IA as initiateUpload Action
  participant RH as /api/upload handleUpload
  participant Blob as Vercel Blob
  participant CA as confirmUpload Action

  UI->>IA: purpose, mime, size
  IA->>IA: INSERT file_asset pending
  IA-->>UI: { fileAssetId, pathname }
  UI->>RH: client upload(bytes)
  RH->>Blob: store
  RH->>CA: onUploadCompleted
  CA->>CA: UPDATE ready + blob_url
  UI->>UI: link certificate FK (ready only)
```

**Postconditions:** `upload_status=ready`; `blob_pathname` canonical.

**Side effects:** `revalidatePath` trainer profile routes.

---

## Negative paths (business)

| Condition | Code |
|-----------|------|
| MIME not allowed | `INVALID_MIME` |
| Size exceeded | `FILE_TOO_LARGE` |
| Confirm without Blob object | `UPLOAD_NOT_FOUND` |
| Link FK while `pending` | `INVALID_UPLOAD_STATE` |
| Confirm twice | Idempotent → still `ready` |

---

## Security paths

| Scenario | MUST |
|----------|------|
| Initiate without auth | Deny `UNAUTHORIZED` |
| Upload token for another user's pathname | `onBeforeGenerateToken` validates payload |
| Client sets pathname | **Ignore** — server generates `{ownerId}/{purpose}/{uuid}` |
| Read private verification doc | Authenticated proxy Route + policy |
| Public URL for verification doc | **Forbidden** — private Blob access |
| RW token in client bundle | **Forbidden** |

---

## Concurrency & idempotency

- Double confirm same asset: idempotent UPDATE `ready`.
- Two parallel uploads same purpose: both may succeed; UI picks latest; orphan `pending` acceptable MVP.
- Link certificate: transaction checks `upload_status === 'ready'` before FK INSERT — FM-012.

---

## Drift & consistency notes

| Risk | Guard |
|------|-------|
| FM-012 pending FK | Domain validator on link use-cases |
| Expiring signed URL as canonical | Store `blob_pathname` |
| S3 SDK introduced | grep `@aws-sdk` |
| Missing pending UI | ui-mutation-pending on upload button |

---

## Policy & layer touchpoints

| Step | Policy | Storage |
|------|--------|---------|
| `InitiateUpload` | `assertCanInitiateUpload(ctx, purpose)` | INSERT pending |
| `onBeforeGenerateToken` | Re-verify session in handler | Token TTL short |
| `ConfirmUpload` | Owner match | UPDATE ready |
| `LinkCertificate` | trainer owner + ready asset | FK insert |
| Admin read doc | `assertCanReadPrivateDoc` | Stream via handler |

**MUST NOT** — import `@vercel/blob` in `@pulse/domain`.

---

## Domain / API surface

| Function | Layer | Returns |
|----------|-------|---------|
| `initiateUpload` | composition | `{ fileAssetId, pathname }` |
| `confirmUpload` | domain + db | `{ uploadStatus: 'ready' }` |
| `failUpload` | domain + db | `{ uploadStatus: 'failed' }` |
| `validateAssetReadyForLink` | domain | void \| throw `INVALID_UPLOAD_STATE` |

---

## Requirements

1. **MUST** — single `file_asset` registry (ADR-007).
2. **MUST** — INV-11: FK only when `ready`.
3. **MUST** — server-generated pathname.
4. **MUST** — `BLOB_READ_WRITE_TOKEN` never `NEXT_PUBLIC_*`.
5. **SHOULD** — verify magic bytes on confirm.

---

## Acceptance criteria

- [ ] Three-phase lifecycle documented
- [ ] Context7 handleUpload pattern referenced
- [ ] FM-012 enforced at link
- [ ] Security: auth, private docs, pathname
- [ ] MIME/size table present
- [ ] Link to adr_007 and blob guideline

---

## Related documents

| Document | Relationship |
|----------|--------------|
| [`adr_007_file_asset_blob_lifecycle.md`](../../../prds/07_governance/adr_007_file_asset_blob_lifecycle.md) | ADR |
| [`blob-upload-agent-instruction.md`](../../../guidelines/nextjs/blob-upload-agent-instruction.md) | Agent guide |
| [`trainer_verification_contract.md`](./trainer_verification_contract.md) | Doc linkage |
| [`domain_invariants.md`](../../../prds/02_domain_model/domain_invariants.md) | INV-11 |
| [`.cursor/rules/vercel-blob-uploads.mdc`](../../../../.cursor/rules/vercel-blob-uploads.mdc) | Cursor rule |

**Registry:** [`documentation_creation_registry.md`](../../../meta/documentation_creation_registry.md) — wave W8-07

---

## Agent notes

- Create DB row **before** Blob bytes upload.
- Profile `photo_url` may mirror ready asset URL — still keep `file_asset` row.
- Post-MVP: cron deletes stale `pending` &gt; 24h.

---

## Change log

| Date | Change |
|------|--------|
| 2026-05-23 | v1.0 — file upload contract |
