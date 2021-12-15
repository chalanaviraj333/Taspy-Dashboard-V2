import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { GarageRemote } from 'src/app/interfaces/garage-remote';
import { PhotoDetails } from 'src/app/interfaces/photo-details';
import { AllGarageRemoteService } from 'src/app/services/all-garage-remote.service';
import { CommonProductUploadService } from 'src/app/services/common-product-upload.service';
import { ModelControllerServiceService } from 'src/app/services/model-controller-service.service';

@Component({
  selector: 'app-add-new-garage-remote',
  templateUrl: './add-new-garage-remote.page.html',
  styleUrls: ['./add-new-garage-remote.page.scss'],
})
export class AddNewGarageRemotePage implements OnInit {

  public enteredModel: string = '';
  public compatibleModels: Array<string> = [];

  constructor(
    public commonProductUploadService: CommonProductUploadService,
    public actionSheetController: ActionSheetController,
    private toastController: ToastController,
    public allhttprequestservice: AllGarageRemoteService,
    private modelController: ModelControllerServiceService
  ) {}

  ngOnInit() {
    if (this.allhttprequestservice.allGarageRemotes.length == 0) {
      this.allhttprequestservice.getAllGarageRemotes();
    }
  }

  async onSubmitNext(form: NgForm) {
    if (this.commonProductUploadService.validentry == true) {
      this.presentToastAddUpload();
      return;
    }

    if (form.value.productNotes != ''){
      const enteredProductDetails: GarageRemote = {
        key: null,
        tapsycode: form.value.tapsycode.toUpperCase(),
        boxnumber: form.value.boxnumber,
        shell: form.value.shell,
        frequency: form.value.frequency,
        compatibleBrand: form.value.compatibleBrand.toUpperCase(),
        productType: 'garage-remote',
        qtyavailable: form.value.qtyavailable,
        image: null,
        notes: [{username: 'Chalana', notebodyText: form.value.productNotes}],
        compatibleModels: this.compatibleModels
      }

      await this.commonProductUploadService.uploadPhotoandItem(enteredProductDetails);

    } else {
      const enteredProductDetails: GarageRemote = {
        key: null,
        tapsycode: form.value.tapsycode.toUpperCase(),
        boxnumber: form.value.boxnumber,
        shell: form.value.shell,
        frequency: form.value.frequency,
        compatibleBrand: form.value.compatibleBrand.toUpperCase(),
        productType: 'garage-remote',
        qtyavailable: form.value.qtyavailable,
        image: null,
        notes: [],
        compatibleModels: this.compatibleModels
      }

      await this.commonProductUploadService.uploadPhotoandItem(enteredProductDetails);
    }
  }

  // perform photo alert sheet funtion
  public async showActionSheet(photo: PhotoDetails, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            // this.photoService.deletePicture(photo, position);
            this.commonProductUploadService.deletePicture(photo, position);
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

  // perform add new component to the remote
  onClickAddNew(newitemCategory: string) {
    this.modelController.onClickAddNewGarageRemoteComponent(newitemCategory);
  }

  // add new garage motor
  onSubmitNewGarageMotor(form: NgForm) {

  }

  onClickAddNewModel() {
    this.compatibleModels.unshift(this.enteredModel.toUpperCase());
  }

  onClickClearAll() {
    this.compatibleModels = [];
  }

  async presentToastAddUpload() {
    const toast = await this.toastController.create({
      message: "Please add a photo first.",
      duration: 4000,
      position: "top",
      color: "dark",
    });
    toast.present();
  }
}
