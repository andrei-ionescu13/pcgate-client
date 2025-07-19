import { LocalePrefix } from 'next-intl/dist/types/src/routing/types';

export const locales = ['en', 'de', 'nl'] as const;
export const defaultLocale = 'en' as const;

export const localePrefix = 'as-needed' satisfies LocalePrefix;
