# PSI lab journal (Pulse)

Сводки лабораторного PageSpeed Insights. Писать **после** `npm run psi:lab` по явной просьбе. Не коммитить API keys. Канон: [`ai_psi_lab_testing.md`](../implementation/mvp/guides/ai_psi_lab_testing.md).

Зелёная зона: Perf / A11y / Best Practices / SEO ≥ 90 (lab). Flake: второй прогон зелёный при том же LCP — не регресс.

---

## Template

```
### YYYY-MM-DD — origin

Command: `npm run psi:lab -- --suite` (or `--url`)

| Path | Warmup | M Perf | M A11y | M BP | M SEO | D Perf | D A11y | D BP | D SEO | M LCP | M FCP | M CLS | Flake |
|------|--------|--------|--------|------|-------|--------|--------|------|-------|-------|-------|-------|-------|
| / | HIT | | | | | | | | | | | | |

Notes:
```

---

## Entries

### 2026-10-07 — https://fitapp-web-ten.vercel.app

Command: `npm run psi:lab -- --suite` (8 public URLs × mobile/desktop; `PSI_TRAINER_PROFILE_ID=b9f13c28-9d92-4c87-a36c-8bf21b634fe2`). Warmup: all `HIT`. Flake retry: 9 runs.

| Path | Warmup | M Perf | M A11y | M BP | M SEO | D Perf | D A11y | D BP | D SEO | M LCP | M FCP | M CLS | Flake |
|------|--------|--------|--------|------|-------|--------|--------|------|-------|-------|-------|-------|-------|
| `/` | HIT | 81 | 91 | 88 | 100 | 94 | 91 | 100 | 100 | 3027ms | 2577ms | 0.000 | yes |
| `/how-it-was-built` | HIT | 90 | 96 | 100 | 100 | 93 | 96 | 100 | 100 | 3451ms | 1201ms | 0.000 | yes |
| `/features` | HIT | 91 | 96 | 100 | 100 | 98 | 96 | 100 | 100 | 3301ms | 1201ms | 0.000 | no |
| `/trainers` | HIT | 84 | 98 | 100 | 100 | 94 | 93 | 100 | 100 | 3751ms | 1201ms | 0.000 | yes |
| `/auth/login` | HIT | 84 | 100 | 100 | 100 | 96 | 100 | 100 | 100 | 3451ms | 1201ms | 0.000 | yes |
| `/auth/register` | HIT | 66 | 100 | 100 | 100 | 93 | 100 | 100 | 91 | 5551ms | 3342ms | 0.000 | yes |
| `/auth/register/trainer` | HIT | 93 | 100 | 100 | 100 | 86 | 100 | 100 | 100 | 2701ms | 1201ms | 0.000 | yes |
| `/trainers/[id]` | HIT | 86 | 98 | 100 | 100 | 92 | 99 | 100 | 100 | 2701ms | 1201ms | 0.000 | yes |

Notes:

- Зелёные (все 4 категории ≥90, m+d): `/how-it-was-built`, `/features`.
- `/` mobile SI 17s при TTI 3.0s / TBT 0 — lab-шум Speed Index; после retry Perf всё ещё 81 (FCP 2.6s / LCP 3.0s) и BP 88 (`image-aspect-ratio`, `image-size-responsive`, `errors-in-console`).
- Худший: `/auth/register` mobile Perf 66 (FCP 3.3s, LCP 5.6s) — клиентская форма без RSC-shell.
- Не чинить A11y-аудиты на страницах с A11y ≥90 (home `heading-order` / `target-size` / `aria-prohibited-attr` — запас, не блокер).

