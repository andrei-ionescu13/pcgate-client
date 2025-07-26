import { Developer } from '@/types/developer';
import { appFetchAuth } from '@/utils/app-fetch';

export const listDevelopers = () =>
  appFetchAuth<Developer[]>({ url: '/developers', withAuth: true });
