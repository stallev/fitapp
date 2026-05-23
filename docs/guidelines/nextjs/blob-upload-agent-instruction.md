# Vercel Blob file upload — Pulse (`file_asset`)

**Role:** Implementation guide for AI agents  
**Schema:** [`database_schema_v1.md`](../../prds/03_data_model/database_schema_v1.md) — `file_asset`, `file_upload_status`  
**Runtime:** [ADR-001](../../prds/07_governance/adr_001_stack_and_runtime.md) — **Vercel Blob**  
**Canon:** [ADR-007](../../prds/07_governance/adr_007_file_asset_blob_lifecycle.md) — lifecycle + FK rules  
**Cursor rule:** **vercel-blob-uploads**

Subordinate to product canon: trainer certificates, profile photos, verification documents.

---

## Architecture

```
Client selects file
  → Server Action: auth + policy → validate type/size
  → Create FileAsset (upload_status: pending) + server-chosen blob_pathname
  → Client upload to Vercel Blob (@vercel/blob client upload or presigned pattern)
  → Server verify → update to ready or failed
  → Link FKs only after ready
```

For Next.js 16 Server Actions / cache: use Context7 `/vercel/next.js/v16.2.2` — `updateTag`, `revalidateTag` per [ADR-002](../../prds/07_governance/adr_002_next162_vercel_runtime_policy.md).

---

## Single registry

- Prisma **`FileAsset`** only — `blob_pathname`, `blob_url`, `upload_status`, `mime_type`, `size_bytes`, …
- **Do not** invent parallel file tables

---

## Lifecycle

| Status | Meaning |
|--------|---------|
| `pending` | Row created; upload in progress |
| `ready` | Verified; safe to link and serve |
| `failed` | Validation or upload error |

FK from `trainer_certificate`, profile photo, etc. — **only when `ready`**.

---

## Auth and policy

Every presign/upload/confirm mutation:

1. `auth()` from `@/auth`
2. `@pulse/policy-server` object check (trainer owns resource, admin moderation, etc.)

---

## Environment (server-only)

```env
BLOB_READ_WRITE_TOKEN=…
```

No `NEXT_PUBLIC_*` for secrets. Configure in Vercel project settings.

---

## Suggested layout (on scaffold)

```
apps/web/src/
  lib/blob/client.ts
  data/file-asset.ts          # DAL — server-only
  actions/file-upload.ts      # thin wrappers
  components/...FileUpload.client.tsx
```

---

## Data access pattern

- Prefer **Server Action** when UX should refresh RSC after upload completes
- **Route Handler** for direct upload API or external clients

See [ai_nextjs_db_data_handle.md](./ai_nextjs_db_data_handle.md).

---

## Reading files

- Serve via Blob URL or short-lived signed access when `upload_status = ready`
- Do not store expiring signed URLs as canonical `blob_url` if they expire — use pathname as source of truth

---

## Dependencies (on scaffold)

```bash
cd apps/web
npm install @vercel/blob
```

---

## Checklist

- [ ] `FileAsset` row before bytes hit storage
- [ ] Policy on every mutation boundary
- [ ] FKs only after `ready`
- [ ] `toast` + pending UI on client upload UI
- [ ] Cache invalidation after confirm

**Reference:** lampto [`s3-upload-agent-instruction.md`](../../examples/lampto/docs/guidelines/nextjs/s3-upload-agent-instruction.md) — S3 → Vercel Blob adaptation.
