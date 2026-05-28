# P: Code Compliance Audit

**Дата аудита:** May 28, 2026  
**Фаза:** Post-P14 quality track  
**Статус:** Задачи C1–C6 выполнены в рамках этого аудита

---

## Сводка по категориям

| Категория | Задач | Критичность |
|-----------|-------|-------------|
| Security | 2 | P0 — критично |
| Accessibility (aria-busy) | 6 файлов | P1 — важно |
| Accessibility (aria-live) | 1 файл | P1 — важно |
| Accessibility (DialogDescription) | 7 файлов | P2 — желательно |
| Performance (bundle) | 2 | P2 — желательно |
| Performance (CSS transitions) | 2 | P3 — низкий приоритет |

---

## C1. Security — P0 (критично)

### C1.1 CSP nonce в `proxy.ts`

**Файл:** `apps/web/src/proxy.ts`  
**Проблема:** CSP не установлен — нет защиты от inline script injection.  
**Fix:** Добавить per-request nonce через `crypto.randomUUID()` → base64, выставить `Content-Security-Policy` + `x-nonce` заголовки после auth-блока.  
**Статус:** ✅ Выполнено

### C1.2 `allowedOrigins` в `next.config.ts`

**Файл:** `apps/web/next.config.ts`  
**Проблема:** `experimental.serverActions.allowedOrigins` не задан — риск при reverse proxy / CDN.  
**Fix:** `allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!]`  
**Статус:** ✅ Выполнено

---

## C2. Accessibility — aria-busy — P1 (важно)

Правило: `disabled={pending}` + `aria-busy={pending}` обязательны на кнопках/формах в in-flight состоянии. Нарушение WCAG 2.1 §4.1.3 и Cursor Rule **ui-mutation-pending**.

### C2.1 `BookingWizard.client.tsx`

**Файл:** `apps/web/src/components/booking/BookingWizard.client.tsx`  
**Проблема:** `aria-busy={isSlotsPending}` отсутствует на кнопке «Далее» (~строка 245).  
**Fix:** `<Button aria-busy={isSlotsPending} disabled={isSlotsPending}>Далее</Button>`  
**Статус:** ✅ Выполнено

### C2.2 `ServiceCard.tsx`

**Файл:** `apps/web/src/components/trainer/ServiceCard.tsx`  
**Проблема:** `aria-busy={disabled}` отсутствует на Edit и Delete кнопках (~строки 77–95).  
**Fix:** Добавить `aria-busy={disabled}` на обе кнопки.  
**Статус:** ✅ Выполнено

### C2.3 `TrainerOnboarding*Step.client.tsx` (4 файла)

**Файлы:** `apps/web/src/components/trainer/onboarding/TrainerOnboarding*Step.client.tsx`  
**Проблема:** `aria-busy={isPending}` отсутствует на кнопке «Назад».  
**Fix:** `<Button aria-busy={isPending} disabled={isPending}>Назад</Button>`  
**Статус:** ✅ Выполнено

### C2.4 `ClientBookingCancelDialog.client.tsx`

**Файл:** `apps/web/src/components/client/ClientBookingCancelDialog.client.tsx`  
**Проблема:** `aria-busy={isPending}` отсутствует на `<form>` и `AlertDialogCancel`.  
**Fix:** `<form aria-busy={isPending}>` + `<AlertDialogCancel disabled={isPending} aria-busy={isPending}>`  
**Статус:** ✅ Выполнено

### C2.5 `TrainerServiceFormSheet.client.tsx`

**Файл:** `apps/web/src/components/trainer/TrainerServiceFormSheet.client.tsx`  
**Проблема:** `aria-busy={isPending}` отсутствует на Cancel кнопке и `<form>`.  
**Fix:** `<form aria-busy={isPending}>` + `<SheetClose disabled={isPending} aria-busy={isPending}>`  
**Статус:** ✅ Выполнено

### C2.6 `AdminRejectDialog`, `RefundActions` (admin)

**Файлы:** `apps/web/src/components/admin/` — `*Dialog*.client.tsx`, `RefundActions.client.tsx`  
**Проблема:** `aria-busy={isPending}` отсутствует на `AlertDialogCancel`.  
**Fix:** `<AlertDialogCancel disabled={isPending} aria-busy={isPending}>`  
**Статус:** ✅ Выполнено

---

## C3. Accessibility — aria-live — P1 (важно)

### C3.1 `CatalogTrainerGrid.server.tsx`

**Файл:** `apps/web/src/components/catalog/CatalogTrainerGrid.server.tsx`  
**Проблема:** Строка с `formatCatalogResultsCount` не объявлена как live region — screen reader не объявляет изменение счётчика при фильтрации.  
**Fix:** Обернуть `ContentText` в `<div aria-live="polite" aria-atomic="true">`.  
**Статус:** ✅ Выполнено

---

## C4. Accessibility — DialogDescription — P2 (желательно)

Отсутствие `DialogDescription` / `SheetDescription` / `AlertDialogDescription` нарушает ARIA dialog specification (assistive tech не получает описание при фокусе в overlay).

| Файл | Fix | Статус |
|------|-----|--------|
| `ClientFileComplaintDialog.client.tsx` | `<DialogDescription className="sr-only">` | ✅ |
| `ClientRequestRefundDialog.client.tsx` | `<DialogDescription className="sr-only">` | ✅ |
| `TrainerServiceFormSheet.client.tsx` | `<SheetDescription className="sr-only">` | ✅ |
| `RefundActions.client.tsx` | `<AlertDialogDescription className="sr-only">` | ✅ |
| `CatalogFilterSheet` | `<SheetDescription className="sr-only">` | ✅ |
| `MarketingNavMobileMenu` | `<SheetDescription className="sr-only">` | ✅ |
| `AddIntervalOverlay` (mobile Sheet) | `<SheetDescription className="sr-only">` | ✅ |

---

## C5. Performance — Bundle — P2 (желательно)

### C5.1 `optimizePackageImports` в `next.config.ts`

**Файл:** `apps/web/next.config.ts`  
**Проблема:** `lucide-react` и `date-fns` не в `optimizePackageImports` — без tree-shaking на уровне bundler.  
**Fix:**
```ts
experimental: {
  optimizePackageImports: ['lucide-react', 'date-fns'],
  serverActions: { allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!] },
}
```
**Статус:** ✅ Выполнено

### C5.2 Dynamic import Calendar в `TrainerScheduleExceptionsTab.client.tsx`

**Файл:** `apps/web/src/components/trainer/schedule/TrainerScheduleExceptionsTab.client.tsx`  
**Проблема:** Статический `import { Calendar }` загружает `react-day-picker` в начальный bundle Client Component.  
**Fix:** `const Calendar = dynamic(() => import('@/components/ui/calendar'), { ssr: false, loading: () => <Skeleton className="h-64 w-full rounded-md" /> })`  
**Статус:** ✅ Выполнено

---

## C6. Performance — CSS transitions — P3 (низкий приоритет)

### C6.1 `tabs.tsx`

**Файл:** `apps/web/src/components/ui/tabs.tsx`  
**Проблема:** `transition-all` в pill-варианте анимирует layout-свойства (height) → Reflow.  
**Fix:** Заменить на `transition-[colors,opacity]`  
**Статус:** ✅ Выполнено

### C6.2 `MarketingNavScrollFrame.client.tsx`

**Файл:** `apps/web/src/components/landing/MarketingNavScrollFrame.client.tsx`  
**Проблема:** `transition-all` может захватывать layout-свойства при scroll-triggered изменениях.  
**Fix:** Заменить на `transition-[border-color,background-color,box-shadow,backdrop-filter]`  
**Статус:** ✅ Выполнено

---

## Новые документы созданы в рамках аудита

| Документ | Тип |
|----------|-----|
| `docs/guidelines/security/ai_security_xss_csrf_guidelines.md` | Новый guideline |
| `docs/guidelines/react/ai_browser_rendering_performance.md` | Новый guideline |
| `.cursor/rules/security-csp.mdc` | Новый Cursor Rule |
| `.cursor/rules/ui-animation-performance.mdc` | Новый Cursor Rule |

## Обновлённые документы

| Документ | Изменения |
|----------|-----------|
| `docs/guidelines/react/ai_semantics_a11y_guidelines.md` | §7 aria-live, §8 axe-core CI |
| `docs/guidelines/nextjs/ai_nextjs_db_data_handle.md` | §5 антипаттерн fetch из RSC |
| `docs/guidelines/nextjs/ai_loading_patterns.md` | updateTag vs revalidateTag clarification |
| `docs/guidelines/react/ai_optimistic_ui_pattern.md` | §6 disabled+aria-busy обязателен |
| `.cursor/rules/ui-semantics-a11y.mdc` | aria-busy + aria-live требования |
| `templates/ai-first-monorepo/docs/reference/stack_patterns_from_pulse.md` | Security + Bundle sections |
