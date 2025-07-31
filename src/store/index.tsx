import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { cart as cartSlice } from './slices/cart';
import { wishlist as wishlistSlice } from './slices/wishlist';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useRef } from 'react';
import { Provider } from 'react-redux'

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     wishlist: wishlistReducer
//   },
//   devTools: true
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type StoreDispatch = typeof store.dispatch;

// export type AppStore = ReturnType<typeof makeStore>;
// export type AppState = ReturnType<AppStore['getState']>;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action
// >;

// export const wrapper = createWrapper<AppStore>(store);

const store = configureStore({
  reducer: {
    [cartSlice.name]: cartSlice.reducer,
    [wishlistSlice.name]: wishlistSlice.reducer,
  },
  devTools: true,
});

const makeStore = () => store

export type StoreDispatch = typeof store.dispatch;

export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
export const wrapper = createWrapper<AppStore>(makeStore);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

export const StoreProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}