import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { CarBrand } from '../car-brand';
import { CarModel } from '../car-model';
import { RemoteShell } from '../interfaces/remote-shell';
import { Remote } from '../remote';
import { AllStorageService } from './all-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestServiceService {

  // remotes
  public allRemotes: Array<Remote> = [];
  public filteredRemotes: Array<Remote> = [];
  public genRemoteTapsyCode: string = '';

  public editRemote: Remote = {
    key: '',
    tapsycode: '',
    boxnumber: 0,
    inbuildchip: '',
    inbuildblade: '',
    battery: '',
    buttons: 0,
    frequency: '',
    costperitem: 0,
    remotetype: '',
    productType: '',
    image: '',
    notes: [],
    qtyavailable: 0,
    compitablecars: [],
    compitablebrands: [],
  }
  public availableRemoteBoxNumber: number = 0;

  // remote shells
  public allRemoteShells: Array<RemoteShell> = [];
  public filteredRemoteShells: Array<RemoteShell> = [];

  // cars
  private allCarModels: Array<CarModel> = [];
  public selectedCarBrandModels: Array<CarModel> = [];
  public carBrands: Array<string> = [];

  // remote components
  public allRemoteChips: Array<string> = [];
  public allRemoteBlades: Array<string> = [];
  public allRemoteFrequency: Array<string> = [];
  public allRemoteBattery: Array<string> = [];

  constructor(private http: HttpClient, private commonStorageService: AllStorageService, public loadingController: LoadingController) {}

  // http request about remotes
  getAllRemotes() {

    if (this.allRemotes.length == 0) {
      this.http
      .get<{ [key: string]: Remote }>(
        'https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json'
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            this.allRemotes.push({
              key,
              tapsycode: resData[key].tapsycode,
              boxnumber: Number(resData[key].boxnumber),
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
              compitablebrands: resData[key].compitablebrands,
            });
          }
        }
        // sorting all remotes by box number
        this.allRemotes.sort((a, b) => (a.boxnumber > b.boxnumber ? 1 : -1));

        // get available remote box number and tapsy code
        this.availableRemoteBoxNumber = this.allRemotes[this.allRemotes.length -1].boxnumber;
        this.genRemoteTapsyCode = 'TAP' + [this.availableRemoteBoxNumber + 1] + '-';
      });


    }

    this.filteredRemotes = this.allRemotes;
  }

  // get all remote chips form the database
  getAllRemoteChips() {
    if (this.allRemoteChips.length == 0) {
      this.http
      .get(
        'https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-chips.json'
      )
      .subscribe((resData) => {
        for (const key in resData) {
          this.allRemoteChips.push(resData[key].chip);
        }
        this.allRemoteChips.sort((a, b) => (a > b) ? 1 : -1)
      });
    }
  }

  // get all remote batteries from the database
  getAllRemoteBatteries() {
    if (this.allRemoteBattery.length == 0) {
      this.http
      .get(
        'https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-battery.json'
      )
      .subscribe((resData) => {
        for (const key in resData) {
          this.allRemoteBattery.push(resData[key].battery);
        }
        this.allRemoteBattery.sort((a, b) => (a > b) ? 1 : -1)
      });
    }
  }

  // get add remote frequency
  getAllRemoteFrequency() {
    if (this.allRemoteFrequency.length == 0) {
      this.http
      .get(
        'https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-frequency.json'
      )
      .subscribe((resData) => {
        for (const key in resData) {
          this.allRemoteFrequency.push(resData[key].frequency);
        }
        this.allRemoteFrequency.sort((a, b) => (a > b) ? 1 : -1)
      });
    }
  }

  // get all remote blades
  getAllRemoteBlade() {
    if (this.allRemoteBlades.length == 0) {
      this.http
      .get(
        'https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-blades.json'
      )
      .subscribe((resData) => {
        for (const key in resData) {
          this.allRemoteBlades.push(resData[key].blade);
        }
        this.allRemoteBlades.sort((a, b) => (a > b) ? 1 : -1)
      });
    }
  }

  // find edit remotes from all the remotes
  findEditRemote(selectedtapsycode: string) {

    // let editRemote: Remote = { key: '', tapsycode: '', boxnumber: 0, inbuildchip: '', inbuildblade: '', battery: '', buttons: 0, frequency: '', costperitem: 0, remotetype: '', productType: '', image: '', notes: [], qtyavailable: 0, compitablecars: [], compitablebrands: []};

    this.allRemotes.forEach(remote => {
      if (remote.tapsycode == selectedtapsycode) {
        this.editRemote = remote;
      }

    });

    // return editRemote;
  }


  // perform searchbar funtion
  performSearch(entervalue: string) {
    this.filteredRemotes = this.allRemotes;

    if (entervalue && entervalue.trim() != "") {
      this.filteredRemotes = this.filteredRemotes.filter((currentremote) => {
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

  // delete remote from database
  async deleteRemote(remote: Remote) {

    this.commonStorageService.deletePhoto(remote.image);

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

  // upload changes in remotes
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


  // http request about cars
  getcarmodels() {
    if (this.allCarModels.length == 0) {
      this.http.get<{ [key: string]: CarModel }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model.json')
      .subscribe(resData => {
        for (const key in resData) {
          this.allCarModels.push(resData[key]);
        }
      });
    }
  }

  // get all car brands from database
  getcarbrands() {
    if (this.carBrands.length == 0) {
      this.http.get<{ [key: string]: CarBrand }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-brand.json')
      .subscribe(resData => {
        for (const key in resData) {
          this.carBrands.push(resData[key].name);
        }
        this.carBrands.sort((a, b) => (a > b) ? 1 : -1)

      });
    }
  }

  // find available car models for selected car brand
  onChangeCarBrand(selectedcarbrand) {
    this.selectedCarBrandModels = [];
    this.allCarModels.forEach(car => {
      if (car.brand == selectedcarbrand.target.value) {
        this.selectedCarBrandModels.push(car);
      }
      this.selectedCarBrandModels.sort((a, b) => (a.model > b.model) ? 1 : -1)
    });
  }


  addnewremotecomponent(newComponentCategory: string, newItemValue: string) {
    if (newComponentCategory == 'New Blade') {
      this.allRemoteBlades.unshift(newItemValue);
      this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-blades.json', {blade: newItemValue}).subscribe(
          resData => {
          });
    }
    else if (newComponentCategory == 'New Frequency'){
      this.allRemoteFrequency.unshift(newItemValue);
      this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-frequency.json', {frequency: newItemValue}).subscribe(
          resData => {
          });

    }
    else if (newComponentCategory == 'New Chip') {
      this.allRemoteChips.unshift(newItemValue);
      this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-chips.json', {chip: newItemValue}).subscribe(
          resData => {
          });
    }
    // New Battery
    else {
      this.allRemoteBattery.unshift(newItemValue);
      this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-battery.json', {battery: newItemValue}).subscribe(
          resData => {
          });

    }
  }

  // http request about all remote shells
  // .....................................


  // get all remote shells
  getAllRemoteShells() {
    if (this.allRemoteShells.length == 0) {
      this.http
      .get<{ [key: string]: RemoteShell }>(
        'https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells.json'
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            this.allRemoteShells.push({
              key,
              tapsycode: resData[key].tapsycode,
              boxnumber: resData[key].boxnumber,
              remotetype: resData[key].remotetype,
              productType: resData[key].productType,
              compitablebrands: resData[key].compitablebrands,
              image: resData[key].image,
              qtyavailable: resData[key].qtyavailable,
              inbuildblade: resData[key].inbuildblade,
              buttons: resData[key].buttons,
              notes: resData[key].notes
            });
          }
        }
        // sorting all remotes by box number
        this.allRemoteShells.sort((a, b) => (a.boxnumber > b.boxnumber ? 1 : -1));

        // get available remote box number and tapsy code
        // this.availableRemoteBoxNumber = this.allRemotes[this.allRemotes.length -1].boxnumber;
        // this.genRemoteTapsyCode = 'TAP' + [this.availableRemoteBoxNumber + 1] + '-';
      });


    }

    this.filteredRemoteShells = this.allRemoteShells;
  }

}
