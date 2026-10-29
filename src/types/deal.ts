import { Meta } from './common';

export interface Deal {
  _id: string;
  cover: {
    publicId: string;
    width: number;
    height: number;
    _id: string;
  };
  title: string;
  description: string;
  slug: string;
  endDate: string;
  meta: Meta;
  hasExpired?: boolean;
}
