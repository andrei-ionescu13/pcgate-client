import { ProductKey } from "./common";
import { Product } from "./product";

export interface LibraryItem {
  createdAt: string;
  key: ProductKey;
  product: Product;
  _id: string;
}