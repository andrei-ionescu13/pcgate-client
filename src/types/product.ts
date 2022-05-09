export interface Review {
  _id: string;
  slug: string;
  rating: number;
  displayName: string;
  title: string;
  text: string;
  date: Date;
  recommended: boolean;
  userId: string;
  productId: string;
}

export interface ReviewsSummary {
  averageRating: number;
  reviewsCount: number;
  recommendedPercentage: number;
  ratingsBreakdown: {
    oneStarPercentage: number;
    twoStarPercentage: number;
    threeStarPercentage: number;
    fourStarPercentage: number;
    fiveStarPercentage: number;
  }
}

export interface Product {
  reviewsSummary: ReviewsSummary;
  reviews: Review[];
  edition_name: string;
  editions: Product[];
  current_discount: {
    display_percentage: boolean;
    percent: number;
  }
  cover: string;
  slug: string;
  _id: string;
  platform: string;
  developers: string[];
  name: string;
  publishers: string[];
  release: Date;
  features: string[];
  genres: string[];
  franchises: string[];
  links?: string[];
  price: {
    [key: string]: number;
  };
  fullPrice: {
    [key: string]: number;
  };
  img?: any;
  video: string[];
  desc: string;
  drm_string: 'rockstar' | 'steam' | 'uplay';
  platform_specs: {
    win: {
      min: string;
      rec: string;
    }
  }
}