export type MutationOk<T = void> = T extends void
  ? { ok: true }
  : { ok: true; data: T };

export type MutationErr = { ok: false; code: string; message?: string };

export type MutationResult<T = void> = MutationOk<T> | MutationErr;
