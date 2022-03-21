import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { CarBrand } from '../car-brand';
import { CarModel } from '../car-model';
import { AvailableRemoteBox } from '../interfaces/available-remote-box';
import { RemoteShell } from '../interfaces/remote-shell';
import { StockAdd } from '../interfaces/stock-add';
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
  public allRemoteTapsyCodes: Array<string> = [];
  public allRemoteShellTapsyCodes: Array<string> = [];
  public filteredtapsycode: Array<string> = [];
  public filteredremoteshelltapsycodes: Array<string> = [];
  public addedStockItems: Array<StockAdd> = [];
  public addedStockItemsRemoteShell: Array<StockAdd> = [];
  public addedMoreStockTodownstairsShells: Array<string> = [];


  public editRemote: Remote = {
    key: '',
    tapsycode: '',
    boxnumber: 0,
    shell: 'A',
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
    recentAddedQuantity: 0,
    recentmoreStockAddDate: new Date(),
    totalSale: 0,
    moreStock: false,
    compitablecars: [],
    compitablebrands: [],
  }

  public editRemoteShell : RemoteShell = {
    key: '',
    tapsycode: '',
    boxnumber: 0,
    shell: '',
    remotetype: '',
    qtyavailable: 0,
    productType: '',
    compitablebrands: [],
    image: '',
    inbuildblade: '',
    buttons: 0,
    recentAddedQuantity: 0,
    recentmoreStockAddDate: new Date(),
    totalSale: 0,
    moreStock: false,
    notes: [],
    compitablecars: []
  }
  public availableRemoteBoxNumber: AvailableRemoteBox = {key: '', availableRemoteBox: 63};
  public availableRemoteShellBoxNumber: number = 0;

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

  // get available box number
  public a_Box_Available: string = '';
  public b_Box_Available: string = '';
  public c_Box_Available: string = '';
  public w_Box_available: string = '';

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
              recentAddedQuantity: resData[key].recentAddedQuantity,
              recentmoreStockAddDate: resData[key].recentmoreStockAddDate,
              totalSale: resData[key].totalSale,
              moreStock: resData[key].moreStock,
              compitablecars: resData[key].compitablecars,
              compitablebrands: resData[key].compitablebrands,
            });
          }
        }

        // sorting all remotes by box number and shell
        this.allRemotes.sort((a, b) => (a.boxnumber > b.boxnumber ? 1 : -1));
      });


    }

    this.filteredRemotes = this.allRemotes;
  }

  getAllRemoteTapsycodes() {
    if (this.allRemoteTapsyCodes.length == 0) {
      this.http
      .get<{ [key: string]: Remote }>(
        'https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json'
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            this.allRemoteTapsyCodes.push(resData[key].tapsycode);
          }
        }
      });
    }
  }

  // get all remoteshell tapsy codes
  getAllRemoteShellsTapsycodes() {
    if (this.allRemoteShellTapsyCodes.length == 0) {
      this.http
      .get<{ [key: string]: Remote }>(
        'https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells.json'
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            this.allRemoteShellTapsyCodes.push(resData[key].tapsycode);
          }
        }
      });
    }
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

  // perform searchbar funtion
  performSearchRemoteShell(entervalue: string) {
    this.filteredRemoteShells = this.allRemoteShells;

    if (entervalue && entervalue.trim() != "") {
      this.filteredRemoteShells = this.filteredRemoteShells.filter((currentremote) => {
        if (currentremote.compitablebrands !== undefined) {
          let searchWord =
            currentremote.boxnumber + currentremote.inbuildblade +
            currentremote.compitablebrands.toString();
          return searchWord.toLowerCase().indexOf(entervalue.toLowerCase()) > -1;
        } else {
          let searchWord = currentremote.boxnumber + currentremote.inbuildblade;
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

    this.filteredRemotes.find((i) => i.tapsycode == enteredRemoteDetails.tapsycode).shell = enteredRemoteDetails.shell;
    this.filteredRemotes.find((i) => i.tapsycode == enteredRemoteDetails.tapsycode).boxnumber = enteredRemoteDetails.boxnumber;


    this.http
        .put(
          `https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes/${enteredRemoteDetails.key}.json`,
          { ...enteredRemoteDetails, key: null }
        )
        // .put(
        //   `https://tapsy-stock-backup-default-rtdb.firebaseio.com/all-remotes/${enteredRemoteDetails.key}.json`,
        //   { ...enteredRemoteDetails, key: null }
        // )
        .subscribe((resData) => {
          setInterval(() => {
            loading.dismiss();
          }, 1000);

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

  async onCLickRemoteBackup() {

    const loading = await this.loadingController.create({
      cssClass: 'uploadingproduct-css-class',
      message: 'Uploading Box No',
      backdropDismiss: false,
    });
    await loading.present();

    this.allRemotes.forEach(remote => {
      this.http
      // .put(
      //   `https://tapsy-stock-backup-default-rtdb.firebaseio.com/all-remotes/${remote.key}.json`,
      //   { ...remote, key: null, shell: 'C' }
      // )
      .put(
        `https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes/${remote.key}.json`,
        { ...remote, key: null, shell: 'C' }
      )
      .subscribe((resData) => {
        loading.message = 'Uploading Box No ' + remote.boxnumber;
        console.log(resData);
      });
    });
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
              shell: resData[key].shell,
              remotetype: resData[key].remotetype,
              productType: resData[key].productType,
              compitablebrands: resData[key].compitablebrands,
              image: resData[key].image,
              qtyavailable: resData[key].qtyavailable,
              inbuildblade: resData[key].inbuildblade,
              buttons: Number(resData[key].buttons),
              recentAddedQuantity: resData[key].recentAddedQuantity,
              recentmoreStockAddDate: resData[key].recentmoreStockAddDate,
              totalSale: resData[key].totalSale,
              moreStock: resData[key].moreStock,
              notes: resData[key].notes
            });
          }
        }
        // sorting all remotes by box number
        this.allRemoteShells.sort((a, b) => (a.boxnumber > b.boxnumber ? 1 : -1));
        this.availableRemoteShellBoxNumber = this.allRemoteShells[this.allRemoteShells.length -1].boxnumber + 1;
      });


    }

    this.filteredRemoteShells = this.allRemoteShells;
  }

  // find edit remoteshell from all the remoteshells
  findEditRemoteShell(selectedtapsycode: string) {

    this.allRemoteShells.forEach(remoteshell => {
      if (remoteshell.tapsycode == selectedtapsycode) {
        this.editRemoteShell = remoteshell;
      }
    });
    // return editRemote;
  }

  async uploadChangesRemoteShell(updateRemoteShell: RemoteShell) {
    const loading = await this.loadingController.create({
      cssClass: 'uploadingproduct-css-class',
      message: 'Uploading Changes',
      backdropDismiss: false,
    });
    await loading.present();

    this.filteredRemoteShells.find((i) => i.tapsycode == updateRemoteShell.tapsycode).shell = updateRemoteShell.shell;
    this.filteredRemoteShells.find((i) => i.tapsycode == updateRemoteShell.tapsycode).boxnumber = updateRemoteShell.boxnumber;
    this.filteredRemoteShells.find((i) => i.tapsycode == updateRemoteShell.tapsycode).qtyavailable = updateRemoteShell.qtyavailable;

    this.http
        .put(
          `https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells/${updateRemoteShell.key}.json`,
          { ...updateRemoteShell, key: null }
        )
        .subscribe((resData) => {
          setInterval(() => {
            loading.dismiss();
          }, 1000);

          loading.message = 'Successfully Uploaded';
          loading.spinner = null;
        });
  }

  performcurrenctPairSearch(entervalue: string) {
    this.filteredtapsycode = this.allRemoteTapsyCodes;

    if (entervalue && entervalue.trim() != "")
    {
      this.filteredtapsycode = this.filteredtapsycode.filter((currentcurrencypair) => {
        let searchWord = currentcurrencypair;
        return searchWord.toLowerCase().indexOf(entervalue.toLowerCase()) > -1;
      });
    }
  }

  performremoteshellTapsycodeSearch(entervalue: number) {
    this.filteredRemoteShells = this.allRemoteShells;

    if (entervalue)
    {
      this.filteredRemoteShells = this.filteredRemoteShells.filter((currentremoteShell) => {
        let searchWord = currentremoteShell;
        return searchWord.boxnumber == entervalue;
      });
    }

  }

  async addNewRemoteStock() {

    const loading = await this.loadingController.create({
      cssClass: 'uploadingproduct-css-class',
      message: 'Uploading New Stock',
      backdropDismiss: false,
    });
    await loading.present();
    this.addedStockItems.forEach(item => {
        const currentRemote: Remote = this.allRemotes.find((i) => i.tapsycode == item.tapsycode);
        const newStock = currentRemote.qtyavailable + item.addedquantity;
        const downStairsStock: boolean = item.downstairsStock;

        currentRemote.recentAddedQuantity = item.addedquantity;
        currentRemote.recentmoreStockAddDate = new Date();

        this.http
        .put(
          `https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes/${currentRemote.key}.json`,
          { ...currentRemote, qtyavailable: newStock, moreStock: downStairsStock, key: null }
        )
        .subscribe((resData) => {
          const index = this.addedStockItems.indexOf(item, 0);
          if (index > -1) {
            this.addedStockItems.splice(index, 1);
          }
        });

    });
    setInterval(() => {
      loading.dismiss();
    }, 1000);

    loading.message = 'Successfully Uploaded';
    loading.spinner = null;
  }

  async addNewRemoteShellStock() {
    const loading = await this.loadingController.create({
      cssClass: 'uploadingproduct-css-class',
      message: 'Uploading New Stock',
      backdropDismiss: false,
    });
    await loading.present();
    this.addedStockItemsRemoteShell.forEach(item => {
        const currentRemoteShell: RemoteShell = this.allRemoteShells.find((i) => i.tapsycode == item.tapsycode);
        const downStairsStock: boolean = true;

        this.http
        .put(
          `https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells/${currentRemoteShell.key}.json`,
          { ...currentRemoteShell, moreStock: downStairsStock, key: null }
        )
        .subscribe((resData) => {
          const index = this.addedStockItemsRemoteShell.indexOf(item, 0);
          if (index > -1) {
            this.addedStockItemsRemoteShell.splice(index, 1);
          }
        });

    });
    setInterval(() => {
      loading.dismiss();
    }, 1000);

    loading.message = 'Successfully Uploaded';
    loading.spinner = null;

  }

  // async addNewRemoteShellStock() {
  //   const loading = await this.loadingController.create({
  //     cssClass: 'uploadingproduct-css-class',
  //     message: 'Uploading New Stock',
  //     backdropDismiss: false,
  //   });
  //   await loading.present();
  //   this.addedStockItemsRemoteShell.forEach(item => {
  //       const currentRemoteShell: RemoteShell = this.allRemoteShells.find((i) => i.tapsycode == item.tapsycode);
  //       const newStock = item.addedquantity + currentRemoteShell.qtyavailable;
  //       const downStairsStock: boolean = item.downstairsStock;

  //       currentRemoteShell.recentAddedQuantity = item.addedquantity;
  //       currentRemoteShell.recentmoreStockAddDate = new Date();

  //       this.http
  //       .put(
  //         `https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells/${currentRemoteShell.key}.json`,
  //         { ...currentRemoteShell, qtyavailable: newStock, moreStock: downStairsStock, key: null }
  //       )
  //       .subscribe((resData) => {
  //         const index = this.addedStockItemsRemoteShell.indexOf(item, 0);
  //         if (index > -1) {
  //           this.addedStockItemsRemoteShell.splice(index, 1);
  //         }
  //       });

  //   });
  //   setInterval(() => {
  //     loading.dismiss();
  //   }, 1000);

  //   loading.message = 'Successfully Uploaded';
  //   loading.spinner = null;

  // }

  // add more stock to downstairs key shells
  async addMoreStockTODownstairsRemoteShell() {
    const loading = await this.loadingController.create({
      cssClass: 'uploadingproduct-css-class',
      message: 'Moving More Stock to Downstairs',
      backdropDismiss: false,
    });
    await loading.present();
    this.addedMoreStockTodownstairsShells.forEach(item => {
        const currentRemoteShell: RemoteShell = this.allRemoteShells.find((i) => i.tapsycode == item);

        this.http
        .put(
          `https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells/${currentRemoteShell.key}.json`,
          { ...currentRemoteShell, moreStock: true, key: null }
        )
        .subscribe((resData) => {
          const index = this.addedMoreStockTodownstairsShells.indexOf(item, 0);
          if (index > -1) {
            this.addedMoreStockTodownstairsShells.splice(index, 1);
          }
        });

    });
    setInterval(() => {
      loading.dismiss();
    }, 1000);

    loading.message = 'Successfully Uploaded';
    loading.spinner = null;
  }

  // get available remote box from database
  getAvailableRemoteBox() {
    const remoteBoxarray: Array<AvailableRemoteBox> = [];
    this.http
      .get<{ [key: string]: AvailableRemoteBox }>(
        'https://tapsystock-a6450-default-rtdb.firebaseio.com/available-remote-box.json'
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            remoteBoxarray.push({
              key,
              availableRemoteBox: resData[key].availableRemoteBox
            });

            this.availableRemoteBoxNumber = {key: remoteBoxarray[0].key, availableRemoteBox: remoteBoxarray[0].availableRemoteBox};
            this.genRemoteTapsyCode = 'TAP' + [this.availableRemoteBoxNumber.availableRemoteBox] + '-';
        }
      }

    });
  }

  // update available remote box
  uploadAvailableRemoteBox() {
    this.http
        .put(
          `https://tapsystock-a6450-default-rtdb.firebaseio.com/available-remote-box/${this.availableRemoteBoxNumber.key}.json`,
          { ...this.availableRemoteBoxNumber, key: null }
        )
        .subscribe((resData) => {
          this.genRemoteTapsyCode = 'TAP' + [this.availableRemoteBoxNumber.availableRemoteBox] + '-';
        });

  }


}
