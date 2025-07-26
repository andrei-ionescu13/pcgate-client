import { Developer as DeveloperI } from '@/types/developer';
import { appFetchAuth } from '@/utils/app-fetch';

export const getDeveloper = (slug: string) =>
  appFetchAuth<DeveloperI>({
    url: `/developers/${slug}`,
  });
