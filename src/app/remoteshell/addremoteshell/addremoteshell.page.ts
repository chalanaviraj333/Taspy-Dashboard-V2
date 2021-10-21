import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { PhotoDetails } from 'src/app/interfaces/photo-details';
import { RemoteShell } from 'src/app/interfaces/remote-shell';
import { HttpRequestServiceService } from 'src/app/services/http-request-service.service';
import { ModelControllerServiceService } from 'src/app/services/model-controller-service.service';
import { RemoteShellPhotoRequestService } from 'src/app/services/remote-shell-photo-request.service';

@Component({
  selector: 'app-addremoteshell',
  templateUrl: './addremoteshell.page.html',
  styleUrls: ['./addremoteshell.page.scss'],
})
export class AddremoteshellPage implements OnInit {


  public selectedcarbrands: Array<string> = [];

  constructor(public allhttprequestservice: HttpRequestServiceService, public remoteShellPhotoService: RemoteShellPhotoRequestService,
    public actionSheetController: ActionSheetController, private toastController: ToastController, private modelController: ModelControllerServiceService) { }

  ngOnInit() {

    // get all remote components from database
    this.allhttprequestservice.getAllRemoteBlade();
    this.allhttprequestservice.getcarbrands();
    this.allhttprequestservice.getAllRemoteShells();
  }

  async onSubmitNext(form: NgForm) {
    if (this.remoteShellPhotoService.validentry == true) {
      this.presentToastAddUpload();
      return;
    }

    if (this.selectedcarbrands.length == 0) {
      this.presentToastAddCarBrands();
      return;
    }


    if (form.value.remotenotes != '') {
      const newRemoteShell: RemoteShell = {
        key: null,
        tapsycode: form.value.tapsycode.toUpperCase(),
        boxnumber: form.value.boxnumber,
        shell: form.value.shell.toUpperCase(),
        remotetype: 'keyshell',
        qtyavailable: form.value.qtyavailable,
        productType: 'remoteshell',
        compitablebrands: this.selectedcarbrands,
        image: form.value.tapsycode,
        inbuildblade: form.value.remoteblade,
        buttons: form.value.buttons,
        notes: [{username: 'Chalana', notebodyText: form.value.remotenotes}],
        compitablecars: []
      }
      this.remoteShellPhotoService.uploadPhotoandItem(newRemoteShell);
    }
    else {
      const newRemoteShell: RemoteShell = {
        key: null,
        tapsycode: form.value.tapsycode.toUpperCase(),
        boxnumber: form.value.boxnumber,
        shell: form.value.shell.toUpperCase(),
        remotetype: 'keyshell',
        qtyavailable: form.value.qtyavailable,
        productType: 'remoteshell',
        compitablebrands: this.selectedcarbrands,
        image: form.value.tapsycode,
        inbuildblade: form.value.remoteblade,
        buttons: form.value.buttons,
        notes: [],
        compitablecars: []
      }
      this.remoteShellPhotoService.uploadPhotoandItem(newRemoteShell);
    }

  }

  _selectBrand(carbrandname) {
    this.selectedcarbrands.push(carbrandname);
  }

  public async showActionSheet(photo: PhotoDetails, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          // this.photoService.deletePicture(photo, position);
          this.remoteShellPhotoService.deletePicture(photo, position);
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

  // perform add new component to the remote
  onClickAddNew(newitemCategory: string) {
    this.modelController.onClickAddNewRemoteComponent(newitemCategory);
  }

  // remove selected car brands form the array
  _removeSelectBrand(carbrandname: string) {
    const index = this.selectedcarbrands.indexOf(carbrandname, 0);
    if (index > -1) {
      this.selectedcarbrands.splice(index, 1);
    }
  }

}
