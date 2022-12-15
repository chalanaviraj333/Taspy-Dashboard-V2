import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { CarBrand } from 'src/app/car-brand';
import { CarModelService } from 'src/app/services/car-model.service';
import { UserPhoto } from 'src/app/user-photo';

@Component({
  selector: 'app-addcarbrand',
  templateUrl: './addcarbrand.page.html',
  styleUrls: ['./addcarbrand.page.scss'],
})
export class AddcarbrandPage implements OnInit {
  constructor(
    public carModelService: CarModelService,
    public actionSheetController: ActionSheetController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  onSubmitNext(form: NgForm) {
    if (this.carModelService.validentry == true) {
      this.presentToastAddUpload();
      return;
    }

    const enteredCarBrandDetails: CarBrand = {
      key: null,
      name: form.value.carbrandname,
      icon: form.value.carbrandname,
    };

    this.carModelService.uploadCarBrand(enteredCarBrandDetails);
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.carModelService.deletePicture(photo, position);
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

  async presentToastAddUpload() {
    const toast = await this.toastController.create({
      message: 'Please add a photo first.',
      duration: 4000,
      position: 'top',
      color: 'dark',
    });
    toast.present();
  }
}
