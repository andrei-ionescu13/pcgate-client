import type { Cart } from "./cart";
import type { Product } from "./product";
import type { Coupon, Review } from "./common";

export interface User {
  _id: string;
  cart: Cart;
  email: string;
  wishlist: string[];
  avatar: string;
  [key: string]: any;
}

export interface UserReview extends Review {
  product: Product;
}


type UserCouponSelection = 'selected' | 'general';
type UserCouponStatus = 'active' | 'expired' | 'used';

export interface UserCoupon extends Coupon {
  userSelection: Selection;
  products: Product[] | null;
  productSelection: UserCouponSelection;
  endDate: string | null;
  status: UserCouponStatus;
}