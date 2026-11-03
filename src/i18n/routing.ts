import { defineRouting } from 'next-intl/routing';
import locale from '../../public/locales.json';

export const routing = defineRouting({
  locales: locale.locales,
  defaultLocale: 'en',
});
