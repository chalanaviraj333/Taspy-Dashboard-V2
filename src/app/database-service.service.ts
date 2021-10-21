import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarModel } from './car-model';
import { Remote } from './remote';
import { Router } from '@angular/router';
import { CarBrand } from './car-brand';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {

  private allRemotes: Array<Remote> = [];
  public filterRemotes: Array<Remote> = [];
  public frequcnyList: Array<string> = [];
  public chipList: Array<string> = [];
  public bladeList: Array<string> = [];
  public carBrands: Array<string> = [];
  public selectedcarbrandmodels: CarModel[] = [];
  private allcars: CarModel[] = [];
  public availableBoxNumber: number = 0;
  public genTapsyCode: string = '';

  constructor(private http: HttpClient, private router: Router, public loadingController: LoadingController) { }

  getAllRemotes() {

    this.allRemotes = [];
    this.filterRemotes = [];
    let duplicatefreqArray: Array<string> = [];
    let duplicatechipArray: Array<string> = [];
    let duplicatebladeArray: Array<string> = [];

    this.http
      .get<{ [key: string]: Remote }>(
        "https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json"
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
              this.allRemotes.push({
                key,
                tapsycode: resData[key].tapsycode,
                boxnumber: Number(resData[key].boxnumber),
                shell: resData[key].shell,
                inbuildchip: resData[key].inbuildchip,
                inbuildblade: resData[key].inbuildblade,
                battery: resData[key].battery,
                qtyavailable: Number(resData[key].qtyavailable),
                buttons: resData[key].buttons,
                costperitem: resData[key].costperitem,
                frequency: resData[key].frequency,
                remotetype: resData[key].remotetype,
                productType: resData[key].productType,
                image: resData[key].image,
                notes: resData[key].notes,
                compitablecars: resData[key].compitablecars,
                compitablebrands: resData[key].compitablebrands
              });

              if (resData[key].frequency != null && resData[key].frequency != '') {
                duplicatefreqArray.push(resData[key].frequency);
              }

              if (resData[key].inbuildchip != null && resData[key].inbuildchip != '') {
                duplicatechipArray.push(resData[key].inbuildchip);
              }

              if (resData[key].inbuildblade != null && resData[key].inbuildblade != '') {
                duplicatebladeArray.push(resData[key].inbuildblade);
              }
          }

        }

        this.allRemotes.sort((a, b) => (a.boxnumber > b.boxnumber ? 1 : -1));
        this.availableBoxNumber = this.allRemotes[this.allRemotes.length -1].boxnumber;
        this.genTapsyCode = 'TAP' + [this.availableBoxNumber + 1] + '-';

        // frequncy list
        this.frequcnyList = duplicatefreqArray.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        });
        this.frequcnyList.sort((a, b) => (a > b ? 1 : -1));

        // chip list
        this.chipList = duplicatechipArray.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        });
        this.chipList.sort((a, b) => (a > b ? 1 : -1));

        // blade array
        this.bladeList = duplicatebladeArray.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        });
        this.bladeList.sort((a, b) => (a > b ? 1 : -1));

      });

      this.filterRemotes = this.allRemotes;

  }

  performSearch(entervalue: string) {
    this.filterRemotes = this.allRemotes;

    if (entervalue && entervalue.trim() != "") {
      this.filterRemotes = this.filterRemotes.filter((currentremote) => {
        if (currentremote.compitablebrands !== undefined) {
          let searchWord =
            currentremote.tapsycode + currentremote.boxnumber +
            currentremote.compitablebrands.toString();
          return searchWord.toLowerCase().indexOf(entervalue.toLowerCase()) > -1;
        } else {
          let searchWord = currentremote.tapsycode + currentremote.boxnumber;
          return searchWord.toLowerCase().indexOf(entervalue.toLowerCase()) > -1;
        }
      });
    }
  }


  getcarbrands() {
    this.carBrands = [];

    this.http.get<{ [key: string]: CarBrand }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-brand.json')
      .subscribe(resData => {
        for (const key in resData) {
          this.carBrands.push(resData[key].name);
        }

        this.carBrands.sort((a, b) => (a > b) ? 1 : -1)

      });
  }

  getcarmodels() {
    this.allcars = [];

    this.http.get<{ [key: string]: CarModel }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model.json')
      .subscribe(resData => {
        for (const key in resData) {
          this.allcars.push(resData[key]);
        }
        this.allcars.sort((a, b) => (a > b) ? 1 : -1)

      });
  }

  onChangeCarBrand(selectedcarbrand) {
    this.selectedcarbrandmodels = [];
    this.allcars.forEach(car => {
      if (car.brand == selectedcarbrand.target.value) {
        this.selectedcarbrandmodels.push(car);
      }
      this.selectedcarbrandmodels.sort((a, b) => (a.model > b.model) ? 1 : -1)
    });


  }

  async uploadEditRemote(enteredRemoteDetails: Remote) {

    const loading = await this.loadingController.create({
      cssClass: 'uploadingproduct-css-class',
      message: 'Uploading Changes',
      backdropDismiss: false,
    });
    await loading.present();

    this.http
        .put(
          `https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes/${enteredRemoteDetails.key}.json`,
          { ...enteredRemoteDetails, key: null }
        )
        .subscribe((resData) => {
          setInterval(() => {
            loading.dismiss();
          }, 2000);

          loading.message = 'Successfully Uploaded';
          loading.spinner = null;
        });
  }

  async deleteRemote(remote: Remote) {

    const loading = await this.loadingController.create({
      cssClass: 'uploadingproduct-css-class',
      message: 'Deleting from Database',
      backdropDismiss: false,
    });
    await loading.present();

    const index = this.allRemotes.indexOf(remote, 0);

    this.http.delete(`https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes/${remote.key}.json`).subscribe
          (resData => {

            setInterval(() => {
              loading.dismiss();
            }, 2000);

            loading.message = 'Successfully Deleted';
            loading.spinner = null;
            this.allRemotes.splice(index, 1);
           })

  }

  deletePicture(editremoteimageURL: string) {

  }


}
