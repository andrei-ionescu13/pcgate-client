import type { Cart } from '@/types/cart';
import { create } from 'zustand';

interface CartState {
  cart: Cart;
  setCart: (cart: Cart) => void;
}

export const useCart = create<CartState>()((set) => ({
  cart: undefined,
  setCart: (cart: Cart) => set(() => ({ cart })),
}));
