import { Car } from "./car";
import { RemoteNote } from "./remote-note";

export interface KeyShells {
  key: string;
  tapsycode: string;
  boxnumber: number;
  remotetype?: string;
  qtyavailable: number;
  productType: string;
  compitablebrands?: Array<string>;
  image: string;
  inbuildblade: string;
  buttons: string
  notes: Array<RemoteNote>;
  addedtoShopify: boolean;
  recentAddedQuantity: number;
  recentmoreStockAddDate: Date;
  totalSale: number;
  moreStock: boolean;
  compitablecars?: Array<Car>;
}
