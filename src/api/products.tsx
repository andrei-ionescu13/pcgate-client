import { useMutation, useQuery } from 'react-query';
import { appFetch } from '../utils/app-fetch';
import { Product } from 'types/product';
import { setWishlistProducts } from 'store/slices/wishlist';
import { appAuthfetch } from 'utils/app-auth-fetch';
import { useAppDispatch } from 'hooks/use-store-dispatch';

export const useGetComingSoong = () => useQuery<Product>('coomingSoon', () => appFetch('products/highlighted/coming-soon'));
export const useGetSpecialDeal = () => useQuery<Product>('specialDeal', () => appFetch('products/highlighted/special-deal'));
export const useGetBestSellers = () => useQuery<Product[]>('bestSellers', () => appFetch('products/best-sellers'));
export const useGetProduct = (slug: string) => useQuery<Product>(['products', slug], () => appFetch(`products/slug/${slug}`));

export const useGetQueryProducts = (body: any) => useQuery<{
  products: Product[];
  counts: {
    totalCount: number;
  }
}>(['query', body], () => appFetch('products/', {
  method: 'POST',
  body: JSON.stringify(body)
}));

export const useGetQueryProductsByName = (query: string, limit: number) => useQuery<{
  products: Product[];
  counts: {
    totalCount: number;
  }
}>(['queryProductsByName', query], () => appFetch('products/', {
  method: 'POST',
  body: JSON.stringify({ query, limit })
}), {
  enabled: !!query,
  keepPreviousData: !!query,
});


export const useAddWishlistItem = () => {
  const appDispatch = useAppDispatch();

  return useMutation((productId: string) => appAuthfetch('users/wishlist', {
    method: 'POST',
    body: JSON.stringify({ productId })
  }), {
    onSuccess: (data) => {
      appDispatch(setWishlistProducts(data || []));
    }
  });
};

export const useAddProductReview = () => useMutation((values: any) => appAuthfetch('reviews', {
  method: 'POST',
  body: JSON.stringify(values)
}));

export const useRemoveProductReview = () => useMutation((reviewId: string) => appAuthfetch('reviews', {
  method: 'DELETE',
  body: JSON.stringify({ reviewId })
}));