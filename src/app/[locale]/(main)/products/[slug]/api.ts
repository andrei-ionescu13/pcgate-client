import type { Product, ProductReview } from '@/types/product';
import { appFetch } from '@/utils/app-fetch';

export const getProduct = (slug: string) =>
  appFetch<Product>({
    url: `/products/${slug}`,
  });

export const searchProductReviews = (slug: string) => () =>
  appFetch<{ reviews: ProductReview[]; count: number }>({
    url: `/products/${slug}/reviews`,
  });
