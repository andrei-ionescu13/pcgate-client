import type { Product } from './product';

type Currency = 'EUR' | 'USD';

export interface Order {
  _id: string;
  user: string;
  createdAt: Date;
  items: Array<{ _id: string; product: Product }>;
  amount: number;
  currency: Currency;
}