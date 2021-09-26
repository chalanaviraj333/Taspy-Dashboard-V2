import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { CarBrand } from 'src/app/car-brand';
import { CarModel } from 'src/app/car-model';
import { CarModelService } from 'src/app/services/car-model.service';
import { UserPhoto } from 'src/app/user-photo';

@Component({
  selector: 'app-addcarmodel',
  templateUrl: './addcarmodel.page.html',
  styleUrls: ['./addcarmodel.page.scss'],
})
export class AddcarmodelPage implements OnInit {

  public allcarbrands: Array<string> = [];

  constructor(private http: HttpClient, public carModelService: CarModelService, public actionSheetController: ActionSheetController, private toastController: ToastController) { }

  ngOnInit() {
    this.http.get<{ [key: string]: CarBrand}>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-brand.json')
    .subscribe(resData => {
      for (const key in resData) {
        this.allcarbrands.push(resData[key].name)
        this.allcarbrands.sort((a, b) => (a > b) ? 1 : -1)
      }
      }
    );
  }

  onSubmitNext(form: NgForm) {

    if (this.carModelService.validentry == true) {
      this.presentToastAddUpload();
      return;
    }

      const enteredCarModelDetails: CarModel = {
        brand: form.value.selectedCarBrand,
        model: form.value.selectedCarModel,
        icon: form.value.selectedCarBrand + form.value.selectedCarModel,
        startyear: form.value.selectedCarStartYear,
        endyear: form.value.selectedCarEndYear
         }

      this.carModelService.uploadCarModel(enteredCarModelDetails);

  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.carModelService.deletePicture(photo, position);
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
