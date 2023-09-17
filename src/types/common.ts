import type { Product } from "./product";

export interface Asset {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: false;
  url: string;
  secure_url: string;
  original_filename: string;
  api_key: string;
  _id: string;
}

export interface Review {
  _id: string;
  userName: string;
  user: string;
  rating: 2;
  content: string;
  createdAt: string;
}

export interface Meta {
  description: string;
  keywords: string[];
  title: string;
}

export interface LineItem {
  productId: string;
  product: Product;
  finalLinePrice: number;
  finalPrice: number;
  originalPrice: number;
  originalLinePrice: number;
  quantity: number;
  _id: string;
}

export interface ProductKey {
  _id: string;
  product: string;
  value: null | string;
}

export interface Genre {
  _id: string;
  slug: string;
  name: string;
}

export interface Platform {
  _id: string;
  name: string;
  logo: Asset;
  slug: string;
}

export interface Coupon {
  _id: string;
  code: string;
  type: "amount" | "percentage";
  value: number;
}
