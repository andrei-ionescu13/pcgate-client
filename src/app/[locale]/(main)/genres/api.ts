import { Genre } from '@/types/common';
import { appFetchAuth } from '@/utils/app-fetch';

export const listGenres = () =>
  appFetchAuth<Genre[]>({ url: '/genres', withAuth: true });
