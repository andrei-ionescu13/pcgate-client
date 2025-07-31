import { Product, ProductReview } from '@/types/product';
import { appFetchAuth } from '@/utils/app-fetch';

export const getProduct = (slug: string) =>
  appFetchAuth<Product>({
    url: `/products/${slug}`,
  });

export const listProductReviews = (slug: string) => () =>
  appFetchAuth<ProductReview[]>({ url: `/products/${slug}/reviews` });
