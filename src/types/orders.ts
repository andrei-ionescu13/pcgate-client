import { Currency } from '@/contexts/settings-context';
import { LineItem, ProductKey } from './common';

type OrderStatus = 'open' | 'archived' | 'canceled'
type OrderPaymentStatus = 'authorized' | 'paid' | 'pending' | 'refunded' | 'expired';
type OrderFulfillmentStatus = 'fulfilled' | 'unfulfilled' | 'partially fulfilled'

export interface OrderLineItem extends LineItem {
  keys: ProductKey[];
}

export interface Order {
  _id: string;
  status: OrderStatus;
  paymentStatus: OrderPaymentStatus;
  fulfillmentStatus: OrderFulfillmentStatus;
  orderNumber: string;
  itemCount: number;
  originalTotalPrice: number;
  totalDiscount: number;
  totalPrice: number;
  lineItems: OrderLineItem[];
  currency: Currency;
  createdAt: string;
}