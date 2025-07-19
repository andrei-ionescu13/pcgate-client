import { LibraryItem } from '@/types/library';
import { appFetch } from '@/utils/app-fetch';

export interface SearchLibraryData {
  items: LibraryItem[];
  count: number;
}

export const searchLibrary = (query: Record<string, any>) =>
  appFetch<SearchLibraryData>({
    url: '/auth/library',
    withAuth: true,
    query,
  });
