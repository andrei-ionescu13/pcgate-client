import type { Coupon, LineItem } from './common';

export interface CartLineItem extends LineItem {
  isUnavailable: boolean;
  maxQuantity: number;
  promoCodeIsApplied: boolean;
}

export interface Cart {
  promoCodeUsed: null | Coupon;
  currency: string;
  itemCount: number;
  items: CartLineItem[];
  originalTotalPrice: number;
  totalDiscount: number;
  totalPrice: number;
  _id: string;
  hasPriceChanged: boolean;
  hasQuantityChanged: boolean;
  hasUnavailable: boolean;
}
