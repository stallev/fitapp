# Browser Rendering Performance — Pulse

**Version:** 1.0 · **Stack:** Next.js **16.2.6** App Router, React 19, Tailwind CSS v4  
**Methodology:** [`docs/meta/ai_first_project_methodology.md`](../../meta/ai_first_project_methodology.md)  
**Cursor rule:** **ui-animation-performance**

AI agents **MUST** follow this when writing CSS animations, inline styles, or DOM-measuring hooks.

---

## 1. Pixel Pipeline — полный цикл

```
JS → Style → Layout → Paint → Composite
```

Задача оптимизации — **минимизировать количество этапов** в каждом кадре.

```
Изменил transform/opacity?  → Composite (самый быстрый путь) ✅
Изменил color/background?   → Paint → Composite
Изменил width/height/margin? → Layout → Paint → Composite (самый дорогой путь) ❌
```

### Главный поток vs GPU

GPU (compositor thread) обрабатывает `transform` и `opacity` — эти анимации **не блокируют JS** и плавны, даже если главный поток занят.

---

## 2. Правила анимаций (обязательно)

### 2.1 Animate only Composite properties

```css
/* ✅ Composite only — идеально */
.card-hover {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.card-hover:hover {
  transform: translateY(-4px);
  opacity: 0.9;
}

/* ✅ Цвет — Paint, приемлемо для редких переходов */
.button {
  transition: background-color 0.15s ease, color 0.15s ease;
}

/* ❌ Reflow на каждом кадре — запрещено в анимациях */
.bad {
  transition: width 0.3s, height 0.3s, margin 0.3s;
}
```

### 2.2 Запрет `transition-all`

`transition-all` анимирует **все** CSS-свойства, включая layout-свойства. Использовать только если список свойств явно known-safe:

```tsx
// ❌ Запрещено там, где меняются layout-свойства
className="transition-all"

// ✅ Явный список
className="transition-[colors,opacity]"
className="transition-[border-color,background-color,box-shadow]"
className="transition-[border-color,background-color,box-shadow,backdrop-filter]"
```

### 2.3 `prefers-reduced-motion` — обязательно глобально

В `apps/web/src/app/globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 3. `will-change` — только где нужно

```css
/* ✅ Для постоянно анимируемых элементов — оправдано */
.spinner {
  will-change: transform;
  animation: spin 1s linear infinite;
}

/* ✅ Добавлять перед анимацией, убирать после */
function animateCard(element: HTMLElement) {
  element.style.willChange = 'transform';
  element.animate([...]).addEventListener('finish', () => {
    element.style.willChange = 'auto'; // Освобождаем GPU-слой
  });
}

/* ❌ Не применять ко всем статичным элементам */
.card { will-change: transform; }  /* Занимает VRAM без пользы */
```

**Правило:** каждый `will-change` — отдельный GPU-слой с потреблением VRAM. На мобильниках VRAM ограничена.

---

## 4. Layout Thrashing — антипаттерн

Layout Thrashing — когда код чередует чтение и запись геометрических свойств, заставляя браузер делать многократный Reflow.

```typescript
// ❌ Thrashing: N × Reflow
boxes.forEach(box => {
  const width = box.offsetWidth; // READ → Reflow
  box.style.width = (width * 2) + 'px'; // WRITE → dirty
  // На следующей итерации READ снова → Reflow
});

// ✅ Read/write разделены: 1 × Reflow
const widths = Array.from(boxes).map(box => box.offsetWidth); // Read batch
boxes.forEach((box, i) => {
  box.style.width = (widths[i] * 2) + 'px'; // Write batch
});
```

**В React:** для DOM-измерений использовать `useLayoutEffect` + `ResizeObserver`, а не `getBoundingClientRect()` в render.

---

## 5. `useLayoutEffect` vs `useEffect`

```tsx
// useEffect: ПОСЛЕ браузерного рендеринга (async)
// Подходит для: API, подписки, логирование
useEffect(() => { fetchData(); }, []);

// useLayoutEffect: ДО браузерного рендеринга (sync)
// Подходит для: DOM-измерения, позиционирование без мерцания
useLayoutEffect(() => {
  const width = ref.current?.offsetWidth ?? 0;
  setWidth(width); // Не вызывает мерцания — выполнено до отрисовки
}, []);
```

> **Правило:** `useLayoutEffect` для DOM-измерений. `useEffect` для всего остального.

---

## 6. FLIP-техника для layout-переходов

Анимировать изменения layout (перемещение карточек) через `transform`, а не напрямую:

```typescript
async function animateLayoutChange(element: HTMLElement, callback: () => void) {
  const first = element.getBoundingClientRect(); // First position
  callback(); // DOM change
  const last = element.getBoundingClientRect();  // Last position

  const deltaX = first.left - last.left;
  const deltaY = first.top - last.top;

  element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  element.style.transition = 'none';
  element.getBoundingClientRect(); // flush
  element.style.transition = 'transform 0.3s ease';
  element.style.transform = ''; // Play to final position
}
```

---

## 7. CSS-переменные и Tailwind v4 для динамических стилей

```tsx
// ✅ CSS-переменная → браузер применяет → GPU рисует
function ProgressBar({ value }: { value: number }) {
  return (
    <div
      className="progress-bar"
      style={{ '--progress': `${value}%` } as React.CSSProperties}
    />
  );
}

// В globals.css:
// .progress-bar::after {
//   transform: scaleX(calc(var(--progress) / 100));
//   transform-origin: left;
//   transition: transform 0.3s ease; /* Composite — OK */
// }
```

---

## 8. Справочная таблица CSS-свойств

| CSS свойство | Триггерит | Результат |
|-------------|----------|-----------|
| `width`, `height`, `margin`, `padding` | Layout + Paint + Composite | ❌ Дорого |
| `top`, `left` (position) | Layout + Paint + Composite | ❌ Дорого |
| `color`, `background` | Paint + Composite | ⚠️ Приемлемо |
| `box-shadow`, `outline` | Paint + Composite | ⚠️ Приемлемо |
| `visibility` | Paint + Composite | ⚠️ Приемлемо |
| `display: none → block` | Layout + Paint + Composite | ❌ Дорого |
| **`transform`** | **Composite only** | ✅ Идеально |
| **`opacity`** | **Composite only** | ✅ Идеально |
| `filter` | Composite only | ✅ Идеально |

---

## 9. Agent checklist

**Анимации:**
- [ ] Анимируешь только `transform` и `opacity`
- [ ] Нет `transition-all` где меняются layout-свойства
- [ ] Конкретный список: `transition-[colors,opacity]` вместо `transition-all`
- [ ] `will-change` только для постоянно анимируемых элементов; убираешь после

**Layout:**
- [ ] Разделил READ и WRITE геометрических свойств
- [ ] Нет `getBoundingClientRect()` в render
- [ ] `useLayoutEffect` для DOM-измерений

**Tailwind:**
- [ ] CSS-переменные для динамических анимируемых значений
- [ ] `prefers-reduced-motion` глобальный reset в `globals.css`

---

## 10. Связанные документы

| Документ | Тема |
|----------|------|
| [ui-animation-performance.mdc](../../../.cursor/rules/ui-animation-performance.mdc) | Cursor rule |
| [`globals.css`](../../../apps/web/src/app/globals.css) | prefers-reduced-motion global reset |
| [`ai_client_lazy_loading.md`](../nextjs/ai_client_lazy_loading.md) | Lazy loading тяжёлых компонентов |

**Reference:** [`apps/text_data/general/05-browser-rendering.md`](../../../apps/text_data/general/05-browser-rendering.md) — исходный обучающий материал.
