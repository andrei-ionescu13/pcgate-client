import { create } from 'zustand';

interface WishlistState {
  products: string[];
  setWishlistProducts: (productIds: string[]) => void;
  addWishlistProduct: (productId: string) => void;
  removeWishlistProduct: (productId: string) => void;
}

export const useWishlist = create<WishlistState>()((set) => ({
  products: [],
  setWishlistProducts: (productIds: string[]) =>
    set(() => ({ products: productIds })),
  addWishlistProduct: (productId: string) =>
    set((state) => ({ products: [...state.products, productId] })),
  removeWishlistProduct: (productId: string) =>
    set((state) => ({
      products: state.products.filter((product) => product !== productId),
    })),
}));
