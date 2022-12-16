import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { CarModel } from 'src/app/car-model';
import { Remote } from 'src/app/remote';
import { SelectedCar } from 'src/app/selected-car';
import { AllStorageService } from 'src/app/services/all-storage.service';
import { HttpRequestServiceService } from 'src/app/services/http-request-service.service';
import { EditRemoteStorageService } from 'src/app/services/remotes/edit-remote-storage.service';

@Component({
  selector: 'app-edit-remote-detail-page',
  templateUrl: './edit-remote-detail-page.page.html',
  styleUrls: ['./edit-remote-detail-page.page.scss'],
})
export class EditRemoteDetailPagePage implements OnInit {

  public selectedcarmodelyears: Array<number>;

  constructor(
    private toastController: ToastController,
    public actionSheetController: ActionSheetController,
    private activatedRoute: ActivatedRoute,
    public allhttprequestservice: HttpRequestServiceService,
    public editRemotePhotoService: EditRemoteStorageService,
    private commonStorageService: AllStorageService
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('tapsycode')) {
        // redirect
        return;
      }
      const selectedtapsycode = paramMap.get('tapsycode');
      this.allhttprequestservice.findEditRemote(selectedtapsycode);
    });
  }

  ngOnInit() {
    // get all remotes from database
    this.allhttprequestservice.getAllRemotes();
    // get all remote components from database
    this.allhttprequestservice.getAllRemoteBlade();
    this.allhttprequestservice.getAllRemoteChips();
    this.allhttprequestservice.getAllRemoteFrequency();
    this.allhttprequestservice.getAllRemoteBatteries();

    // get all car brands from database
    this.allhttprequestservice.getcarbrands();
    this.allhttprequestservice.getcarmodels();
  }

  onSubmitNext(form: NgForm) {
    if (this.allhttprequestservice.editRemote.compitablebrands.length == 0) {
      this.presentToastAddCarBrands();
      return;
    }
    const compitableBrandsunsorted: Array<string> = [];

    this.allhttprequestservice.editRemote.compitablecars.forEach(car => {
      compitableBrandsunsorted.push(car.brand);

    });

    const compitableBrandssorted = compitableBrandsunsorted.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });

    let enteredtapsycode: string = form.value.tapsycode.toUpperCase();

    const enteredRemoteDetails: Remote = {
      key: this.allhttprequestservice.editRemote.key,
      tapsycode: enteredtapsycode,
      boxnumber: form.value.boxnumber,
      shell: form.value.shell.toUpperCase(),
      inbuildchip: form.value.remotechip,
      inbuildblade: form.value.remoteblade,
      battery: form.value.remotebattery,
      buttons: null,
      frequency: form.value.remotefrequency,
      costperitem: null,
      remotetype: form.value.remotetype,
      suppliertype: form.value.suppliertype,
      partid: form.value.partid,
      dealerPrice: form.value.dealerPrice,
      supplierprodcode: form.value.supplierprodcode,
      productType: 'remote',
      image: this.allhttprequestservice.editRemote.image,
      notes: this.allhttprequestservice.editRemote.notes,
      qtyavailable: form.value.qtyavailable,
      recentAddedQuantity: this.allhttprequestservice.editRemote.recentAddedQuantity,
      recentmoreStockAddDate: this.allhttprequestservice.editRemote.recentmoreStockAddDate,
      totalSale: this.allhttprequestservice.editRemote.totalSale,
      moreStock:  this.allhttprequestservice.editRemote.moreStock,
      compitablecars: this.allhttprequestservice.editRemote.compitablecars,
      compitablebrands: compitableBrandssorted,
    };

    this.allhttprequestservice.uploadEditRemote(enteredRemoteDetails);
  }

  onClickRemoveComCar(compatibleCar: any) {

    // remove car brand from compatible car brand list
    const indexBrand = this.allhttprequestservice.editRemote.compitablebrands.indexOf(compatibleCar.brand, 0);
    this.allhttprequestservice.editRemote.compitablebrands.splice(indexBrand, 1);

    // remove car model from compatible car model list
    const indexModel = this.allhttprequestservice.editRemote.compitablecars.indexOf(compatibleCar, 0);
    this.allhttprequestservice.editRemote.compitablecars.splice(indexModel, 1);

  }

  onSubmitCar(carform: NgForm) {
    const selectedCar: SelectedCar = {
      brand: carform.value.brand,
      model: carform.value.model.model,
      startyear: carform.value.startyear,
      endyear: carform.value.endyear,
    };
    if (this.allhttprequestservice.editRemote.compitablecars == undefined){
      this.allhttprequestservice.editRemote.compitablecars = [];
      this.allhttprequestservice.editRemote.compitablecars.push(selectedCar);
    }
    else {
      this.allhttprequestservice.editRemote.compitablecars.push(selectedCar);
    }

    let unsortedcompatiblebrands: Array<string> = [];
    if (this.allhttprequestservice.editRemote.compitablebrands !== undefined) {
      unsortedcompatiblebrands =
      this.allhttprequestservice.editRemote.compitablebrands;

    }
    unsortedcompatiblebrands.push(carform.value.brand);

    this.allhttprequestservice.editRemote.compitablebrands = unsortedcompatiblebrands.filter(
      function (elem, index, self) {
        return index === self.indexOf(elem);
      }
    );
  }

  onChangeBrand(selectedcarbrand) {
    this.allhttprequestservice.onChangeCarBrand(selectedcarbrand);
  }

  onChangeModel(selectedcarmodel) {
    this.selectedcarmodelyears = [];
    let startyear: number = selectedcarmodel.target.value.startyear;
    let endyear: number = selectedcarmodel.target.value.endyear;

    for (let i = startyear; i <= endyear; i++) {
      this.selectedcarmodelyears.push(i);
    }
  }

  async presentToastAddCarBrands() {
    const toast = await this.toastController.create({
      message: 'Please add a car brand first.',
      duration: 4000,
      position: 'top',
      color: 'dark',
    });
    toast.present();
  }

  public async showActionSheet(editremoteimageURL: string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Upload New',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.commonStorageService.deletePhoto(editremoteimageURL);
            this.editRemotePhotoService.addNewToGallery(this.allhttprequestservice.editRemote.tapsycode);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
