# Security: XSS и CSRF — Pulse

**Version:** 1.0 · **Stack:** Next.js **16.2.6** App Router, React 19, TypeScript  
**Methodology:** [`docs/meta/ai_first_project_methodology.md`](../../meta/ai_first_project_methodology.md)  
**Cursor rule:** **security-csp**  
**Runtime:** [ADR-002](../../prds/07_governance/adr_002_next162_vercel_runtime_policy.md)

AI agents **MUST** follow this guide when handling user input, writing HTTP responses, or configuring request interception.

---

## 1. XSS — фундамент

**XSS (Cross-Site Scripting)** — атака, при которой злоумышленник внедряет JavaScript-код в страницу, которую видят другие пользователи. Браузер жертвы выполняет его в контексте доверенного сайта.

### Три вида XSS

| Вид | Механизм | Опасность |
|-----|----------|-----------|
| **Stored** | Код сохраняется в БД и показывается всем | Критично — автоматически атакует всех |
| **Reflected** | Код приходит через URL, вставляется в HTML | Высокая — нужно обмануть пользователя |
| **DOM-based** | Код попадает в DOM через опасные Browser API | Высокая — сервер не участвует |

---

## 2. Защита от XSS в Pulse (`apps/web`)

### 2.1 JSX — первая линия (автоматическая)

React экранирует все строки при рендеринге:

```tsx
// ✅ Автоматически безопасно
function TrainerBio({ bio }: { bio: string }) {
  return <p>{bio}</p>;
  // bio = '<script>evil()</script>' → &lt;script&gt;evil()&lt;/script&gt;
}
```

**Исключения, требующие ручной защиты:**
- `dangerouslySetInnerHTML`
- `href`/`src` с пользовательскими данными (возможны `javascript:` URLs)
- Server Components с конкатенацией строк в HTML

### 2.2 `dangerouslySetInnerHTML` — только с санитайзером

В Pulse текущие два `dangerouslySetInnerHTML` безопасны (JSON-LD через `serializeJsonLd`, CSS vars из design tokens). При появлении user-generated HTML — обязателен `isomorphic-dompurify`:

```tsx
import DOMPurify from 'isomorphic-dompurify';

function TrainerRichBio({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'li'],
    ALLOWED_ATTR: ['href', 'rel'],
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: clean }}
      className="prose"
    />
  );
}
```

> **DOMPurify в Pulse:** как `devDependency` нужен только при появлении user-generated HTML. Добавлять по задаче, не превентивно.

### 2.3 Санитайзинг при записи в БД (defense in depth)

Санитайзировать данные **при записи**, а не только при отображении:

```typescript
// apps/web/src/actions/trainer/update-bio.ts
'use server';

import DOMPurify from 'isomorphic-dompurify';

export async function updateTrainerBio(formData: FormData) {
  const rawBio = formData.get('bio') as string;

  // Санитайзируем перед записью — только текст
  const sanitizedBio = DOMPurify.sanitize(rawBio, { ALLOWED_TAGS: [] });

  // ... policy check, save to DB
}
```

### 2.4 Блокировка `javascript:` в href

```tsx
function SafeLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isSafe = href.startsWith('/') || href.startsWith('https://');
  return isSafe ? <a href={href}>{children}</a> : <span>{children}</span>;
}
```

---

## 3. Content Security Policy (CSP) в `proxy.ts`

В Pulse (Next.js 16) CSP устанавливается в **`proxy.ts`** — canonical request interception файл. **Не** в `next.config.ts` headers (нет per-request nonce).

```typescript
// apps/web/src/proxy.ts  — добавить после auth-блока
export async function proxy(request: NextRequest) {
  // ... existing auth/locale logic ...

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const isDev = process.env.NODE_ENV === 'development';

  const cspHeader = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
    isDev ? `style-src 'self' 'unsafe-inline'` : `style-src 'self' 'nonce-${nonce}'; style-src-attr 'unsafe-inline'`,
    "img-src 'self' blob: data: https:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join('; ');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}
```

**Использование nonce в Server Component:**

```typescript
// apps/web/src/app/layout.tsx или page.tsx
import { headers } from 'next/headers';

export default async function RootLayout({ children }: ...) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js"
          strategy="afterInteractive"
          nonce={nonce}
        />
      </head>
      ...
    </html>
  );
}
```

---

## 4. httpOnly куки (Auth.js)

Pulse использует Auth.js v5 — сессионные куки настраиваются в `auth.config.ts`, не вручную. Auth.js выставляет `httpOnly: true`, `secure: true`, `sameSite: 'lax'` по умолчанию.

> **httpOnly не защищает от XSS полностью.** Злоумышленник всё ещё может делать запросы от имени пользователя, читать DOM, перехватывать ввод. Это лишь предотвращает кражу токена через `document.cookie`.

---

## 5. CSRF — фундамент

**CSRF (Cross-Site Request Forgery)** — атака, при которой злоумышленник заставляет браузер авторизованного пользователя отправить запрос на сервер. Браузер автоматически прикрепляет куки — сервер считает запрос легитимным.

**Ключевое:** атакующий не читает ответ — только инициирует запрос. Поэтому CSRF опасен только для state-changing операций (POST, PUT, DELETE).

---

## 6. Защита от CSRF в Pulse

### 6.1 Server Actions — встроенная защита (основной путь)

Next.js Server Actions **автоматически проверяют Origin**. Фреймворк не выполнит Action с постороннего Origin.

```typescript
// ✅ Server Actions защищены от CSRF по умолчанию
'use server';

export async function cancelBooking(bookingId: string) {
  // Origin проверен Next.js — но auth/policy проверяешь сам
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');
  // ...
}
```

### 6.2 `allowedOrigins` в `next.config.ts` (reverse proxy / CDN)

Если Pulse стоит за reverse proxy или CDN — добавить `allowedOrigins`:

```typescript
// apps/web/next.config.ts
const nextConfig: NextConfig = {
  // ...
  experimental: {
    serverActions: {
      allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
    },
  },
};
```

### 6.3 Route Handlers — ручная проверка Origin

Для Route Handlers автоматической CSRF-защиты нет:

```typescript
// apps/web/src/app/api/some-mutation/route.ts
export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin !== process.env.NEXT_PUBLIC_APP_URL) {
    return new NextResponse('Forbidden', { status: 403 });
  }
  // ...
}
```

### 6.4 `timingSafeEqual` для сравнения секретов

```typescript
import { timingSafeEqual } from 'crypto';

function isValidToken(provided: string, expected: string): boolean {
  const a = Buffer.from(provided, 'hex');
  const b = Buffer.from(expected, 'hex');
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
```

---

## 7. Ключевое различие XSS vs CSRF

| Характеристика | XSS | CSRF |
|----------------|-----|------|
| **Суть** | Выполнение кода в браузере жертвы | Отправка запроса от имени жертвы |
| **Читает данные** | ✅ Полный доступ к DOM | ❌ Только инициирует действия |
| **Основная защита** | Escaping + CSP | SameSite + встроенная защита Actions |
| **Auth.js помогает** | httpOnly куки | sameSite: 'lax' |

**Связь:** XSS может обходить CSRF-защиту, прочитав CSRF-токен из DOM. Поэтому XSS — более опасная атака, и защита от неё приоритетна.

---

## 8. Agent checklist

**XSS:**
- [ ] `dangerouslySetInnerHTML` — только с `DOMPurify.sanitize`
- [ ] `href` с пользовательскими данными — валидация и блокировка `javascript:`
- [ ] CSP задан в `proxy.ts` (nonce per-request)
- [ ] Auth.js куки — доверять библиотеке (`httpOnly`, `secure`, `sameSite`)
- [ ] Санитайзинг при записи в БД для rich text

**CSRF:**
- [ ] Server Actions для мутирующих форм — защита автоматическая
- [ ] `allowedOrigins` задан при reverse proxy / CDN
- [ ] Мутирующие Route Handlers проверяют `origin` header
- [ ] Секреты сравниваются через `timingSafeEqual`

---

## 9. Связанные документы

| Документ | Тема |
|----------|------|
| [`proxy.ts`](../../../apps/web/src/proxy.ts) | Request interception, CSP nonce |
| [`next.config.ts`](../../../apps/web/next.config.ts) | `allowedOrigins` |
| [ADR-002](../../prds/07_governance/adr_002_next162_vercel_runtime_policy.md) | Next.js 16 runtime |
| [auth-security.mdc](../../../.cursor/rules/auth-security.mdc) | Auth.js, sessions |
| [security-csp.mdc](../../../.cursor/rules/security-csp.mdc) | Cursor rule |

**Reference:** [`apps/text_data/general/01-security-xss-csrf.md`](../../../apps/text_data/general/01-security-xss-csrf.md) — исходный обучающий материал.
