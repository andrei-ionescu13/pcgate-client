import { Language } from '@/contexts/settings-context';
import { appFetch } from '@/utils/app-fetch';
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export const listLanguages = () =>
  appFetch<Language[]>({
    url: '/languages',
  });

export default getRequestConfig(async ({ requestLocale }) => {
  const languages = await listLanguages();
  const locales = languages.map((language) => language.code);

  // if (!locales.includes(requestLocale as any)) notFound();

  const requested = await requestLocale;
  const locale = hasLocale(locales, requested)
    ? requested
    : routing.defaultLocale;

  const response = await fetch(
    `https://res.cloudinary.com/desubtoqp/raw/upload/locales/${locale}.json`
  );
  const messages = await response.json();
  console.log(messages);
  return {
    locale,
    messages,
  };
});
