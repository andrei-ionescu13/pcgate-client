import { Meta } from "./common";

export interface Deal {
  _id: string;
  cover: {
    public_id: string;
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