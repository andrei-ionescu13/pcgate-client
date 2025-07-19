import { Product, ProductReview } from '@/types/product';
import { appFetch } from '@/utils/app-fetch';

export const getProduct = (slug: string) =>
  appFetch<Product>({
    url: `/products/${slug}`,
  });

export const listProductReviews = (slug: string) => () =>
  appFetch<ProductReview[]>({ url: `/products/${slug}/reviews` });
