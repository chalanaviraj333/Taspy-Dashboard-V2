import { Remote } from "../remote";
import { RemoteShell } from "./remote-shell";
import { WorkOnProducts } from "./work-on-products";

export interface CarSubModel {
  key: string;
  brand: string;
  model: string;
  submodel: string;
  typeofignition: string;
  icon: string;
  useruploadImage: string;
  uploadremotephoto: string;
  startyear: number;
  endyear: number;
  remotempn: string;
  remotempnprice: number;
  compatibleremotes: Array<WorkOnProducts>;
  compatibleremoteshells: Array<WorkOnProducts>;
  compatibleKDRemotes: Array<WorkOnProducts>;
  compatibleXhorseRemote: Array<WorkOnProducts>;
  chipID: string;
  freq: string;
  profile: string;
  allLostKeyPrice: number;
  spareKeyPrice: number;
  compatibleDevicesSpare: Array<string>;
  compatibleDevicesAllLost: Array<string>;
  allLostKeySpecialNotes: Array<string>;
  spareKeySpecialNotes: Array<string>;
  allLostKeyPriceUpdateDate: Date;
  spareKeyPriceUpdateDate: Date;
}
