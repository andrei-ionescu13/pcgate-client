import { createSlice } from '@reduxjs/toolkit';
import type { Cart } from '../../types/cart';

const initialState: Cart | undefined = {
  items: []
};

export const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state: Cart, action: { payload: Cart | undefined }) => {
      if (action.payload) {
        const { items, price, currentPrice } = action.payload;
        state.items = items;
        state.price = price;
        state.currentPrice = currentPrice;
        return;
      }

      state = initialState;
    }
  }
});

export const { setCart } = cart.actions;

export const cartReducer = cart.reducer;