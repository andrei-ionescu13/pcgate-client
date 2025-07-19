import { Genre } from '@/types/common';
import { appFetch } from '@/utils/app-fetch';

export const listGenres = () =>
  appFetch<Genre[]>({ url: '/genres', withAuth: true });
