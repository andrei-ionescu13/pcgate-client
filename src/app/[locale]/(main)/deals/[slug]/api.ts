import type { Deal } from '@/types/deal';
import type { Product } from '@/types/product';
import { appFetch } from '@/utils/app-fetch';

interface ListDealProductsData {
  products: Product[];
  nextCursor: string | null;
  hasNext: boolean;
}

export const getDeal = (slug: string) =>
  appFetch<Deal>({
    url: `/deals/${slug}`,
  });

export const listDealProducts = (slug: string, cursor?: string) =>
  appFetch<ListDealProductsData>({
    url: `/deals/${slug}/products`,
    query: { cursor },
  });
