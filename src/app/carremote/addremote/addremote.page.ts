import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Remote } from 'src/app/remote';
import { SelectedCar } from 'src/app/selected-car';
import { ModelControllerServiceService } from 'src/app/services/model-controller-service.service';
import { HttpRequestServiceService } from 'src/app/services/http-request-service.service';
import { PhotoDetails } from 'src/app/interfaces/photo-details';
import { RemotePhotoRequestService } from 'src/app/services/remote-photo-request.service';
import { GetAvailableBoxNumberService } from 'src/app/services/get-available-box-number.service';

@Component({
  selector: 'app-addremote',
  templateUrl: './addremote.page.html',
  styleUrls: ['./addremote.page.scss'],
})
export class AddremotePage implements OnInit {

  public addedCars: Array<SelectedCar> = [];
  private compitableBrandsunsorted: Array<string> = [];
  private compitableBrands: Array<string> = [];
  public selectedcarmodelyears: Array<number>;
  public availableShell: string = "W";

  constructor(
     public actionSheetController: ActionSheetController,
      private toastController: ToastController,
      private modelController: ModelControllerServiceService,
      public allhttprequestservice: HttpRequestServiceService,
      public remotePhotoService: RemotePhotoRequestService,
      public getAvailableBoxNumberService: GetAvailableBoxNumberService) {

  }

  // public photoService: PhotoServiceService,

  ngOnInit() {
    // get all remotes from database
    this.allhttprequestservice.getAllRemotes();

    // get all remote components from database
    this.allhttprequestservice.getAllRemoteBlade();
    this.allhttprequestservice.getAllRemoteChips();
    this.allhttprequestservice.getAllRemoteFrequency();
    this.allhttprequestservice.getAllRemoteBatteries();
    this.allhttprequestservice.getAvailableRemoteBox();
    this.getAvailableBoxNumberService.getAvailableBoxNumbers();

    // get all car brands from database
    this.allhttprequestservice.getcarbrands();
    this.allhttprequestservice.getcarmodels();
  }

  // perform photo alert sheet funtion
  public async showActionSheet(photo: PhotoDetails, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          // this.photoService.deletePicture(photo, position);
          this.remotePhotoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
         }
      }]
    });
    await actionSheet.present();
  }

  // perform get related car models to choosed car brand
  onChangeBrand(selectedcarbrand) {
    this.allhttprequestservice.onChangeCarBrand(selectedcarbrand);
  }

  // get model years based on selected car models
  onChangeModel(selectedcarmodel) {
    this.selectedcarmodelyears = [];
    let startyear: number = selectedcarmodel.target.value.startyear;
    let endyear: number = selectedcarmodel.target.value.endyear;

    for (let i = startyear; i <= endyear; i++) {
      this.selectedcarmodelyears.push(i);
    }
  }


  // add new remote to the database once user press save and upload button
  async onSubmitNext(form: NgForm) {

    if (this.remotePhotoService.validentry == true) {
      this.presentToastAddUpload();
      return;
    }

    if (this.compitableBrands.length == 0) {
      this.presentToastAddCarBrands();
      return;
    }

    let enteredtapsycode: string = form.value.tapsycode.toUpperCase();

    if (form.value.remotenotes != ''){
      const enteredRemoteDetails: Remote = {
        key: null,
        tapsycode: enteredtapsycode,
        boxnumber: form.value.boxnumber,
        shell: form.value.remoteshell,
        inbuildchip: form.value.remotechip,
        inbuildblade: form.value.remoteblade,
        battery: form.value.remotebattery,
        buttons: null,
        frequency: form.value.remotefrequency,
        costperitem: null,
        remotetype: form.value.remotetype,
        suppliertype: form.value.suppliertype,
        productType: 'remote',
        image: enteredtapsycode,
        notes: [{username: 'Chalana', notebodyText: form.value.remotenotes}],
        qtyavailable: form.value.qtyavailable,
        recentAddedQuantity: undefined,
        recentmoreStockAddDate: undefined,
        totalSale: 0,
        moreStock: false,
        compitablecars: this.addedCars,
        compitablebrands: this.compitableBrands
      }


      await this.remotePhotoService.uploadPhotoandItem(enteredRemoteDetails);
      this.allhttprequestservice.availableRemoteBoxNumber.availableRemoteBox++
      this.allhttprequestservice.uploadAvailableRemoteBox();

    } else {
      const enteredRemoteDetails: Remote = {
        key: null,
        tapsycode: enteredtapsycode,
        boxnumber: form.value.boxnumber,
        shell: form.value.remoteshell,
        inbuildchip: form.value.remotechip,
        inbuildblade: form.value.remoteblade,
        battery: form.value.remotebattery,
        buttons: null,
        frequency: form.value.remotefrequency,
        costperitem: null,
        remotetype: form.value.remotetype,
        suppliertype: form.value.suppliertype,
        productType: 'remote',
        image: enteredtapsycode,
        notes: [],
        qtyavailable: form.value.qtyavailable,
        recentAddedQuantity: undefined,
        recentmoreStockAddDate: undefined,
        totalSale: 0,
        moreStock: false,
        compitablecars: this.addedCars,
        compitablebrands: this.compitableBrands
      }

      await this.remotePhotoService.uploadPhotoandItem(enteredRemoteDetails);
      this.allhttprequestservice.availableRemoteBoxNumber.availableRemoteBox++
      this.allhttprequestservice.uploadAvailableRemoteBox();
    }

  }

  // add compatible car to compatible car list once user press the add car button
  onSubmitCar(carform: NgForm) {
    const selectedCar: SelectedCar = {brand: carform.value.brand, model: carform.value.model.model, startyear: carform.value.startyear, endyear: carform.value.endyear}
    this.addedCars.push(selectedCar);

    this.compitableBrandsunsorted.push(carform.value.brand);

    this.compitableBrands = this.compitableBrandsunsorted.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });

  }

  // alert controller for empty photo
  async presentToastAddUpload() {
    const toast = await this.toastController.create({
      message: "Please add a photo first.",
      duration: 4000,
      position: "top",
      color: "dark",
    });
    toast.present();
  }

  // alert controller for empty compatible car list
  async presentToastAddCarBrands() {
    const toast = await this.toastController.create({
      message: "Please add a car brand first.",
      duration: 4000,
      position: "top",
      color: "dark",
    });
    toast.present();
  }

  // remove all compatible car once user press remove cars
  onClickRemoveCars() {
    this.addedCars = [];
    this.compitableBrands = [];
  }

  // perform add new component to the remote
  onClickAddNew(newitemCategory: string) {
    this.modelController.onClickAddNewRemoteComponent(newitemCategory);
  }


}
