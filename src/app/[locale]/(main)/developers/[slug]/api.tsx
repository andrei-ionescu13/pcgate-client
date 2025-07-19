import { Developer as DeveloperI } from '@/types/developer';
import { appFetch } from '@/utils/app-fetch';

export const getDeveloper = (slug: string) =>
  appFetch<DeveloperI>({
    url: `/developers/${slug}`,
  });
