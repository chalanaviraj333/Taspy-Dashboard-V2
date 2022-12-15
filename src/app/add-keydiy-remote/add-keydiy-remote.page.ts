import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { KeydiyProduct } from '../interfaces/keydiy-product';
import { KeydiyProductUploadService } from '../services/keydiy-product-upload.service';
import { UserPhoto } from '../user-photo';

@Component({
  selector: 'app-add-keydiy-remote',
  templateUrl: './add-keydiy-remote.page.html',
  styleUrls: ['./add-keydiy-remote.page.scss'],
})
export class AddKeydiyRemotePage implements OnInit {

  constructor(public keyProductUploadService: KeydiyProductUploadService, public actionSheetController: ActionSheetController, private toastController: ToastController) { }

  ngOnInit() {
  }

  onSubmitNext(form: NgForm) {
    const newKeyDIyProduct: KeydiyProduct = {key: '', name: form.value.productname, series: form.value.productseries, notes: '', image: ''};

    this.keyProductUploadService.uploadKEYDIYProduct(newKeyDIyProduct);
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.keyProductUploadService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
         }
      }]
    });
    await actionSheet.present();
  }

  async presentToastAddUpload(messagesend: string) {
    const toast = await this.toastController.create({
      message: messagesend,
      duration: 4000,
      position: "top",
      color: "dark",
    });
    toast.present();
  }

}
