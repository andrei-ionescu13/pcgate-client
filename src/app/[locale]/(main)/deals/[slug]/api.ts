import { Deal } from '@/types/deal';
import { Product } from '@/types/product';
import { appFetch } from '@/utils/app-fetch';

interface ListDealProductsData {
  products: Product[];
  hasNext: boolean;
}

export const getDeal = (slug: string) =>
  appFetch<Deal>({
    url: `/deals/${slug}`,
  });

export const listDealProducts = (slug: string, page: number) =>
  appFetch<ListDealProductsData>({
    url: `/deals/${slug}/products`,
    query: { page },
  });
