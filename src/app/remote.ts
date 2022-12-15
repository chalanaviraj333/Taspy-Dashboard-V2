import { Car } from './car';
import { DealerPartDetails } from './interfaces/dealer-part-details';
import { RemoteNote } from './remote-note';

export interface Remote {
  key: string;
  tapsycode: string;
  boxnumber: number;
  shell: string;
  inbuildchip?: string;
  inbuildblade?: string;
  battery?: string;
  buttons?: number;
  frequency?: string;
  costperitem?: number;
  remotetype?: string;
  productType: string;
  suppliertype: string;
  partid: DealerPartDetails;
  supplierprodcode: string;
  image?: string;
  notes?: Array<RemoteNote>;
  qtyavailable: number;
  recentAddedQuantity: number;
  recentmoreStockAddDate: Date;
  totalSale: number;
  moreStock: boolean;
  compitablecars?: Array<Car>;
  compitablebrands: Array<string>;
}
