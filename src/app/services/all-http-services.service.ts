import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CarBrand } from '../car-brand';
import { CarModel } from '../car-model';
import { CarSubModel } from '../interfaces/car-sub-model';
import { KeydiyProduct } from '../interfaces/keydiy-product';
import { WorkOnProducts } from '../interfaces/work-on-products';
import { Remote } from '../remote';

@Injectable({
  providedIn: 'root'
})
export class AllHttpServicesService {

  private allcarBrands: Array<CarBrand> = [];
  public searchCarBrands: Array<CarBrand> = [];

  public isFetching: boolean = true;

  // all car models array and search car model array
  private allCarModels: Array<CarModel> = [];
  public searchCarModels: Array<CarModel> = [];

    // all car sub models array and search car model array
  private allCarSubModels: Array<CarSubModel> = [];
  public searchCarSubModels: Array<CarSubModel> = [];

  // sub model verified remotes
  public verifiedRemotes: Array<any> = [];
  public verifiedKEYDIYProds: Array<any> = [];

  constructor(private http: HttpClient, public toastController: ToastController) { }

  getallCarBrandsFromDatabase() {
    if (this.allcarBrands.length == 0) {
      this.http.get<{ [key: string]: CarBrand}>('https://tapsy-stock-app-v3-database-default-rtdb.firebaseio.com/all-car-brands.json')
    .subscribe(resData => {
      for (const key in resData) {
        if (resData.hasOwnProperty(key)){
            this.allcarBrands.push({key, name: resData[key].name, icon: resData[key].icon })
            this.allcarBrands.sort((a, b) => (a.name > b.name) ? 1 : -1)
        }
      }
      this.searchCarBrands = this.allcarBrands;
      }
    );
    }
  }


  // get all car models from the database
  getAllCarModels(selectedCarBrand: string) {
    this.isFetching = true;
    this.allCarModels = [];

      this.http
      .get<{ [key: string]: CarModel }>(
        "https://tapsy-stock-app-v3-database-default-rtdb.firebaseio.com/all-car-models.json"
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            if (resData[key].brand == selectedCarBrand) {
              this.allCarModels.push({
                key,
                brand: resData[key].brand,
                model: resData[key].model,
                startyear: resData[key].startyear,
                endyear: resData[key].endyear,
                icon: resData[key].icon,
                show: resData[key].show
              });
              this.allCarModels.sort((a, b) => (a.model > b.model ? 1 : -1));
              this.isFetching = false;
            }
          }
        }

        this.searchCarModels = this.allCarModels;

        if (this.allCarModels.length == 0) {
          this.isFetching = false;
        }

      });
  }

  // get all car sub models from database
  getAllCarSubModels(selectedBrand: string, selectedModel: string) {
    this.isFetching = true;
    this.allCarSubModels = [];

      this.http
      .get<{ [key: string]: CarSubModel }>(
        "https://tapsy-stock-app-v3-database-default-rtdb.firebaseio.com/all-car-sub-models.json"
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            if (resData[key].brand == selectedBrand && resData[key].model == selectedModel) {
              this.allCarSubModels.push({
                key,
                brand: resData[key].brand,
                model: resData[key].model,
                submodel: resData[key].submodel,
                typeofignition: resData[key].typeofignition,
                icon: resData[key].icon,
                useruploadImage: resData[key].useruploadImage,
                uploadremotephoto: resData[key].uploadremotephoto,
                startyear: resData[key].startyear,
                endyear: resData[key].endyear,
                compatibleremotes: resData[key].compatibleremotes,
                compatibleremoteshells: resData[key].compatibleremoteshells,
                compatibleKDRemotes: resData[key].compatibleKDRemotes,
                compatibleXhorseRemote: resData[key].compatibleXhorseRemote,
                chipID: resData[key].chipID,
                freq: resData[key].freq,
                profile: resData[key].profile,
                allLostKeyPrice: Number(resData[key].allLostKeyPrice),
                spareKeyPrice: Number(resData[key].spareKeyPrice),
                compatibleDevicesSpare: resData[key].compatibleDevicesSpare,
                compatibleDevicesAllLost: resData[key].compatibleDevicesAllLost,
                allLostKeySpecialNotes: resData[key].allLostKeySpecialNotes,
                spareKeySpecialNotes: resData[key].spareKeySpecialNotes,
                allLostKeyPriceUpdateDate: resData[key].allLostKeyPriceUpdateDate,
                spareKeyPriceUpdateDate: resData[key].spareKeyPriceUpdateDate
              });
              this.allCarSubModels.sort((a, b) => (a.startyear > b.startyear ? 1 : -1));
              this.isFetching = false;
            }
          }
        }

        this.searchCarSubModels = this.allCarSubModels;

        if (this.allCarSubModels.length == 0) {
          this.isFetching = false;
        }

      });
  }

  // add verified remote to sub model
  addVerifiedProductoSubModel(carproduct: any, selectedyear: number, subModelKey: string, buttontype: string) {
    const subModelCar : CarSubModel = this.allCarSubModels.find((i) => i.key === subModelKey);

    if (buttontype == 'addremote') {
      if (subModelCar.compatibleremotes == undefined) {
        subModelCar.compatibleremotes = [];
        const compatibleProduct: WorkOnProducts = {key: carproduct.key, date: new Date(), year: selectedyear};
        subModelCar.compatibleremotes.push(compatibleProduct);
      }
      else {
        const compatibleProduct: WorkOnProducts = {key: carproduct.key, date: new Date(), year: selectedyear};
        subModelCar.compatibleremotes.push(compatibleProduct);
      }
    }
    else if (buttontype == 'addremoteshell') {
      if (subModelCar.compatibleremoteshells == undefined) {
        subModelCar.compatibleremoteshells = [];
        const compatibleProduct: WorkOnProducts = {key: carproduct.key, date: new Date(), year: selectedyear};
        subModelCar.compatibleremoteshells.push(compatibleProduct);
      }
      else {
        const compatibleProduct: WorkOnProducts = {key: carproduct.key, date: new Date(), year: selectedyear};
        subModelCar.compatibleremoteshells.push(compatibleProduct);
      }
    }
    // keydiy
    else if (buttontype == 'addkeydiyProd') {
      if (subModelCar.compatibleKDRemotes == undefined) {
        subModelCar.compatibleKDRemotes = [];
        const compatibleProduct: WorkOnProducts = {key: carproduct.key, date: new Date(), year: selectedyear};
        subModelCar.compatibleKDRemotes.push(compatibleProduct);
      }
      else {
        const compatibleProduct: WorkOnProducts = {key: carproduct.key, date: new Date(), year: selectedyear};
        subModelCar.compatibleKDRemotes.push(compatibleProduct);
      }
    }

    this.http
      .put(
        `https://tapsy-stock-app-v3-database-default-rtdb.firebaseio.com/all-car-sub-models/${subModelKey}.json`,
        { ...subModelCar, key: null }
      )
      .subscribe((resData) => {
        const message: string = carproduct.name;
        this.presentToastAddRemote(message);
      });
  }

  async presentToastAddRemote(message: string) {
    const toast = await this.toastController.create({
      message: message + " Added Successfully.",
      duration: 2000,
      position: "top",
      color: "dark",
    });
    toast.present();
  }

   // get compatible remote according to car sub model in submodel result page
   getVerifiedRemotes(compatibleremotesArray: Array<WorkOnProducts>) {
    compatibleremotesArray.forEach(product => {
      this.http
      .get<{ [key: string]: Remote }>(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json"
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (key == product.key) {
            this.verifiedRemotes.push({
              key,
              testedyear: product.year,
              testedDate: new Date(product.date).getDate(),
              testedMonth: new Date(product.date).toLocaleString('default', { month: 'short' }),
              testedDateYear: new Date(product.date).getFullYear(),
              ...resData[key]
            });
          }
          this.verifiedRemotes.sort((a, b) =>
            a.boxnumber > b.boxnumber ? 1 : -1
          );
        }
        });
    });
  }

  // get compatible keydiy remote according to car sub model in submodel result page
  getVerifiedKEYDIYProds(compatibleremotesArray: Array<WorkOnProducts>) {
    compatibleremotesArray.forEach(product => {
      this.http
      .get<{ [key: string]: KeydiyProduct }>(
        "https://tapsy-stock-app-v3-database-default-rtdb.firebaseio.com/all-keydiy-products.json"
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (key == product.key) {
            this. verifiedKEYDIYProds.push({
              key,
              testedyear: product.year,
              testedDate: new Date(product.date).getDate(),
              testedMonth: new Date(product.date).toLocaleString('default', { month: 'short' }),
              testedDateYear: new Date(product.date).getFullYear(),
              ...resData[key]
            });
          }
          this. verifiedKEYDIYProds.sort((a, b) =>
            a.boxnumber > b.boxnumber ? 1 : -1
          );
        }
        });
    });
  }

}
