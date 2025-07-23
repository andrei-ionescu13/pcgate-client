import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  eslintConfigPrettier,
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  }),
];

export default eslintConfig;
