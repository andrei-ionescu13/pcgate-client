import type { Asset } from "./common";

export interface Publisher {
  _id: string,
  name: string,
  logo: Asset;
}
