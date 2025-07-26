import { Genre } from '@/types/common';
import { appFetchAuth } from '@/utils/app-fetch';

export const getGenre = (slug: string) =>
  appFetchAuth<Genre>({
    url: `/genres/${slug}`,
  });
