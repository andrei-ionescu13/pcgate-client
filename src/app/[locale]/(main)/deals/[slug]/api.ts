import { Deal } from '@/types/deal';
import { Product } from '@/types/product';
import { appFetchAuth } from '@/utils/app-fetch';

interface ListDealProductsData {
  products: Product[];
  hasNext: boolean;
}

export const getDeal = (slug: string) =>
  appFetchAuth<Deal>({
    url: `/deals/${slug}`,
  });

export const listDealProducts = (slug: string, page: number) =>
  appFetchAuth<ListDealProductsData>({
    url: `/deals/${slug}/products`,
    query: { page },
  });
