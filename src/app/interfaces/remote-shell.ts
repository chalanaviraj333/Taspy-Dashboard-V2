import { Car } from "../car";
import { RemoteNote } from "../remote-note";

export interface RemoteShell {
  key: string;
  tapsycode: string;
  boxnumber: number;
  shell: string;
  remotetype?: string;
  qtyavailable: number;
  productType: string;
  compitablebrands?: Array<string>;
  image: string;
  inbuildblade: string;
  buttons: number;
  notes: Array<RemoteNote>;
  compitablecars?: Array<Car>;
}
