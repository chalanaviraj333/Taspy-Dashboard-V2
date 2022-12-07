import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarBrand } from '../car-brand';
import { CarModel } from '../car-model';
import { CarSubModel } from '../interfaces/car-sub-model';

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

  constructor(private http: HttpClient) { }

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
                startyear: resData[key].startyear,
                endyear: resData[key].endyear,
                compatibleremotes: resData[key].compatibleremotes,
                compatibleremoteshells: resData[key].compatibleremoteshells,
                chipID: resData[key].chipID,
                freq: resData[key].freq,
                profile: resData[key].profile,
                allLostKeyPrice: Number(resData[key].allLostKeyPrice),
                spareKeyPrice: Number(resData[key].spareKeyPrice),
                compatibleDevices: resData[key].compatibleDevices,
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
}
