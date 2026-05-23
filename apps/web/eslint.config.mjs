import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Pulse Web — ESLint 9 flat config (Next.js 16.2.6).
 *
 * Monorepo policy:
 * - Web client keeps its own config here (`eslint-config-next` + React/App Router rules).
 * - Future `packages/*` (domain, db, policy) will use separate Node/TS configs without React plugins.
 * - A shared root preset can be added when npm workspaces are scaffolded at repo root.
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // shadcn/ui upstream primitives — vendor patterns may trip React 19 hook lint rules.
  {
    files: ["src/components/ui/**"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
]);

export default eslintConfig;
