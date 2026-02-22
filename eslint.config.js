import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
  js.configs.recommended,
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...typescriptEslint.configs.strict,
  ...typescriptEslint.configs.stylistic,
  prettier,
  globalIgnores([
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'dist/**',
    '.payload/**',
    'coverage/**',
    '.vercel/**',
    'public/static/**',
    'public/media/**',
    'src/app/(payload)/**',
    'src/migrations/**',
    'src/payload-types.ts',
  ]),
]);
