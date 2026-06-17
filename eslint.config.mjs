import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "supabase/seed/**",
      "scripts/**",
      "supabase/seed/src/stage-1-crawl/storage/**",
      "pnpm-lock.yaml",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "react/no-unescaped-entities": "off",
    },
  },
]

export default eslintConfig
