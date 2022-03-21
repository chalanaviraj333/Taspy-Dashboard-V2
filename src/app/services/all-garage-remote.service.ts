import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GarageRemote } from '../interfaces/garage-remote';

@Injectable({
  providedIn: 'root'
})
export class AllGarageRemoteService {

  public allFrequncies: Array<string> = [];
  public allGarageRemotes: Array<GarageRemote> = [];

  constructor(private http: HttpClient) { }

  getAllGarageRemotes() {

    let duplicatefreqArray: Array<string> = [];

    if (this.allGarageRemotes.length == 0) {
      this.http
      .get<{ [key: string]: GarageRemote }>(
        'https://tapsystock-a6450-default-rtdb.firebaseio.com/garage-remotes.json'
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            this.allGarageRemotes.push({
              key,
              tapsycode: resData[key].tapsycode,
              boxnumber: resData[key].boxnumber,
              shell: resData[key].shell,
              frequency: resData[key].frequency,
              compatibleBrand: resData[key].compatibleBrand,
              productType: resData[key].productType,
              qtyavailable: resData[key].qtyavailable,
              sellingPrice: resData[key].sellingPrice,
              image: resData[key].image,
              instructionsImage: resData[key].instructionsImage,
              notes: resData[key].notes,
              compatibleModels: resData[key].compatibleModels
            });

            if (resData[key].frequency != null && resData[key].frequency != '') {
              duplicatefreqArray.push(resData[key].frequency);
            }
          }
        }

        // frequncy list
        this.allFrequncies = duplicatefreqArray.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        });
        this.allFrequncies.sort((a, b) => (a > b ? 1 : -1));

        // sorting all garage remotes by box number and shell
        this.allGarageRemotes.sort((a, b) => (a.boxnumber > b.boxnumber ? 1 : -1));

      });
    }
  }

  getAllGarageRemoteFrequncies() {

  }

  addnewComponent(addnewCategory, newItemValue) {
    if (addnewCategory == 'New Frequency'){
      this.allFrequncies.push(newItemValue);
    }
  }
}
