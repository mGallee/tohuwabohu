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
    'dist/**',
    'coverage/**',
    '.vercel/**',
    '.turbo/**',
    '.cache/**',
    'next-env.d.ts',
    '*.tsbuildinfo',
    'src/payload-types.ts',
    'media/**',
    'importMap.js',
    'src/app/(payload)/**',
    'src/migrations/**',
  ]),
]);
