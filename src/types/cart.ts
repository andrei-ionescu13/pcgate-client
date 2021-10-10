import type { Product } from './product';

export interface Cart {
  items: Array<{ _id: string; product: Product; }>;
  price?: {
    [key: string]: number;
  };
  currentPrice?: {
    [key: string]: number;
  };
}