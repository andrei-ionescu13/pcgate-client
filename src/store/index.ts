import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './slices/cart';
import { wishlistReducer } from './slices/wishlist';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;