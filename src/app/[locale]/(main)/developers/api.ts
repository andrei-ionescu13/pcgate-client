import { Developer } from '@/types/developer';
import { appFetch } from '@/utils/app-fetch';

export const listDevelopers = () =>
  appFetch<Developer[]>({ url: '/developers' });
