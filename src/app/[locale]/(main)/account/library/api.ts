import { LibraryItem } from '@/types/library';
import { appFetchAuth } from '@/utils/app-fetch';

export interface SearchLibraryData {
  items: LibraryItem[];
  count: number;
}

export const searchLibrary = (query: Record<string, any>) =>
  appFetchAuth<SearchLibraryData>({
    url: '/auth/library',
    query,
  });
