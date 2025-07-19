import { appFetch } from '@/utils/app-fetch';
import { ParsedUrlQuery } from 'querystring';

export const searchProducts = (query: ParsedUrlQuery) =>
  appFetch<any>({
    url: `/products`,
    query,
  });
