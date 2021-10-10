import { createSlice } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';

interface WishlistState {
  products: Product[];
}

const initialState: WishlistState = {
  products: []
};

export const wishlist = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlistProducts: (state: WishlistState, action: { payload: Product[] }) => {
      state.products = action.payload;
    }
  }
});

export const { setWishlistProducts } = wishlist.actions;

export const wishlistReducer = wishlist.reducer;