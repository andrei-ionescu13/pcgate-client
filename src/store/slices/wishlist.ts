import { createSlice } from '@reduxjs/toolkit';
import type { Product } from '@/types/product';
import { HYDRATE } from 'next-redux-wrapper';

interface WishlistState {
  products: string[];
}

const initialState: WishlistState = {
  products: []
};

export const wishlist = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlistProducts: (state: WishlistState, action: { payload: string[] }) => {
      state.products = action.payload;
    },
    addWishlistProduct: (state: WishlistState, action: { payload: string }) => {
      state.products = [...state.products, action.payload];
    },
    removeWishlistProduct: (state: WishlistState, action: { payload: string }) => {
      state.products = state.products.filter((product) => product !== action.payload);
    },
  },
});

export const { setWishlistProducts, addWishlistProduct, removeWishlistProduct } = wishlist.actions;
