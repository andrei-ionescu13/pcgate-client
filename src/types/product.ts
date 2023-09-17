import type { Asset, Review } from "./common";

interface Platform {
  name: string;
  _id: string;
  logo: Asset;
}

interface Publisher {
  name: string;
  _id: string;
  slug: string;
}

interface Genre {
  name: string;
  _id: string;
  slug: string;
}

interface Developer {
  name: string;
  _id: string;
  slug: string;
}

interface OperatingSystem {
  name: string;
  _id: string;
  slug: string;
}

interface Feature {
  name: string;
  _id: string;
  slug: string;
}

export interface ProductReview extends Review {
  product: string;
  hasDelete: boolean;
}

export interface Product {
  _id: string;
  cover: Asset;
  images: Asset[];
  videos: string[];
  title: string;
  price: number;
  originalPrice?: number;
  genres: Genre[];
  releaseDate: string;
  publisher: Publisher;
  platform: Platform;
  developers: Developer[];
  languages: string[];
  features: Feature[];
  link: string[];
  os: OperatingSystem[];
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
    };
    average: number;
  };
  reviews: ProductReview[];
  discount: string;
  createdAt: string;
}
