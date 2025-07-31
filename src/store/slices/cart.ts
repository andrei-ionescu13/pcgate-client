import { createSlice } from '@reduxjs/toolkit';
import type { Cart } from '@/types/cart';
import { HYDRATE } from "next-redux-wrapper";
import { Action } from '@cloudinary/url-gen/internal/Action';

const initialState: Cart = {
  "currency": 'USD',
  "itemCount": 0,
  "items": [],
  "originalTotalPrice": 0,
  "totalDiscount": 0,
  "totalPrice": 0,
  "_id": "",
};

export const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (_, action: { payload: Cart }) => {
      return action.payload;
    }
  },

});

export const { setCart } = cart.actions;
