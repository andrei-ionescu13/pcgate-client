import type { Developer } from '@/types/developer';
import { appFetch } from '@/utils/app-fetch';

export const getDeveloper = (slug: string) =>
  appFetch<Developer>({
    url: `/developers/${slug}`,
  });
