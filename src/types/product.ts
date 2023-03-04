import type { Asset, Review } from "./common";

interface Platform {
  name: string;
  _id: string;
  logo: Asset;
}

export interface ProductReview extends Review {
  product: string;
  hasDelete: boolean;
}

export interface Product {
  _id: string,
  cover: Asset;
  images: Asset[];
  videos: string[];
  title: string;
  price: number;
  initialPrice: number;
  genres: string[];
  releaseDate: string;
  publisher: string;
  platform: Platform;
  developers: string[];
  languages: string[];
  features: string[];
  link: string[];
  os: string[];
  markdown: string;
  metaTitle: string;
  metaDescription: string;
  minimumRequirements: string;
  recommendedRequirements: string;
  slug: string;
  metaKeywords: string[];
  keys: string[];
  rating: {
    distribution: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    },
    average: number;
  },
  reviews: ProductReview[];
  discount: string;
  createdAt: string;
}