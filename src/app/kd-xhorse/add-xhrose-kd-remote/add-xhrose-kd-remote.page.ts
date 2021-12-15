import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Kdxhorse } from 'src/app/interfaces/kdxhorse';
import { PhotoDetails } from 'src/app/interfaces/photo-details';
import { CommonProductUploadService } from 'src/app/services/common-product-upload.service';

@Component({
  selector: 'app-add-xhrose-kd-remote',
  templateUrl: './add-xhrose-kd-remote.page.html',
  styleUrls: ['./add-xhrose-kd-remote.page.scss'],
})
export class AddXhroseKdRemotePage implements OnInit {

  constructor(public commonProductUploadService:CommonProductUploadService, public actionSheetController: ActionSheetController, private toastController: ToastController) { }

  ngOnInit() {
  }

  async onSubmitNext(form: NgForm) {
    if (this.commonProductUploadService.validentry == true) {
      this.presentToastAddUpload();
      return;
    }

    if (form.value.productnotes != ''){
      const enteredProductDetails: Kdxhorse = {
        key: null,
        tapsycode: form.value.tapsycode.toUpperCase(),
        boxnumber: form.value.boxnumber,
        shell: form.value.shell.toUpperCase(),
        series: form.value.series.toUpperCase(),
        productcategory: form.value.productcategory,
        name: form.value.productname,
        productType: 'kdxhorseremote',
        qtyavailable: form.value.qtyavailable,
        image: form.value.tapsycode,
        butttons: form.value.buttons,
        notes: [{username: 'Chalana', notebodyText: form.value.productnotes}],
      }

      await this.commonProductUploadService.uploadPhotoandItem(enteredProductDetails);

    } else {
      const enteredProductDetails: Kdxhorse = {
        key: null,
        tapsycode: form.value.tapsycode.toUpperCase(),
        boxnumber: form.value.boxnumber,
        shell: form.value.shell.toUpperCase(),
        series: form.value.series.toUpperCase(),
        productcategory: form.value.productcategory,
        name: form.value.productname,
        productType: 'kdxhorseremote',
        qtyavailable: form.value.qtyavailable,
        image: form.value.tapsycode,
        butttons: form.value.buttons,
        notes: [],
      }

      await this.commonProductUploadService.uploadPhotoandItem(enteredProductDetails);
    }

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
            this.commonProductUploadService.deletePicture(photo, position);
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

}
