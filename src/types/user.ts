import type { Cart } from './cart';
import type { Coupon, Review } from './common';
import type { Product } from './product';

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
  productSelection: UserCouponSelection;
  endDate: string | null;
  status: UserCouponStatus;
}
