import { Genre } from '@/types/common';
import { appFetch } from '@/utils/app-fetch';

export const getGenre = (slug: string) =>
  appFetch<Genre>({
    url: `/genres/${slug}`,
  });
