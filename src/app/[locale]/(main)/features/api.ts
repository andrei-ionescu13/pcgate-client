import { Developer } from '@/types/developer';
import { appFetch } from '@/utils/app-fetch';

export const listFeatures = () =>
  appFetch<Developer[]>({ url: '/features', withAuth: true });
