import { appFetchAuth } from '@/utils/app-fetch';
import { ParsedUrlQuery } from 'querystring';

export const searchProducts = (query: ParsedUrlQuery) =>
  appFetchAuth<any>({
    url: `/products`,
    query,
  });
