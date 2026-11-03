import type { Coupon, LineItem } from './common';
import type { Product } from './product';

export interface CartLineItem {
  product: Product;
  finalLinePrice: number;
  finalPrice: number;
  originalPrice: number;
  originalLinePrice: number;
  quantity: number;
  _id: string;
  isUnavailable: boolean;
  maxQuantity: number;
  coupon: boolean;
}

export interface Cart {
  coupon: null | Coupon;
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
