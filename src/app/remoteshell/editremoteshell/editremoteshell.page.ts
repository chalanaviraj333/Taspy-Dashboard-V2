import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestServiceService } from 'src/app/services/http-request-service.service';
import { RemoteShellPhotoRequestService } from 'src/app/services/remote-shell-photo-request.service';
import { NgForm } from '@angular/forms';
import { ModelControllerServiceService } from 'src/app/services/model-controller-service.service';
import { ToastController } from '@ionic/angular';
import { RemoteShell } from 'src/app/interfaces/remote-shell';

@Component({
  selector: 'app-editremoteshell',
  templateUrl: './editremoteshell.page.html',
  styleUrls: ['./editremoteshell.page.scss'],
})
export class EditremoteshellPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, public allhttprequestservice: HttpRequestServiceService,
     public remoteShellPhotoService: RemoteShellPhotoRequestService, private modelController: ModelControllerServiceService,
     private toastController: ToastController) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('tapsycode')) {
        // redirect
        return;
      }
      const selectedtapsycode = paramMap.get('tapsycode');
      this.allhttprequestservice.findEditRemoteShell(selectedtapsycode);
    });
   }

  ngOnInit() {
    this.allhttprequestservice.getAllRemoteBlade();
    this.allhttprequestservice.getcarbrands();
  }

  async onSubmitNext(form: NgForm) {

    if (this.allhttprequestservice.editRemoteShell.compitablebrands.length == 0) {
      this.presentToastAddCarBrands();
      return;
    }

    const updateRemoteShell: RemoteShell = {
      key: this.allhttprequestservice.editRemoteShell.key,
      tapsycode: form.value.tapsycode.toUpperCase(),
      boxnumber: form.value.boxnumber,
      shell: form.value.shell.toUpperCase(),
      remotetype: 'keyshell',
      qtyavailable: form.value.qtyavailable,
      productType: 'remoteshell',
      compitablebrands: this.allhttprequestservice.editRemoteShell.compitablebrands,
      image: this.allhttprequestservice.editRemoteShell.image,
      inbuildblade: form.value.remoteblade,
      buttons: form.value.buttons,
      notes: this.allhttprequestservice.editRemoteShell.notes,
      compitablecars: []
    }

      this.allhttprequestservice.uploadChangesRemoteShell(updateRemoteShell);
  }

  _selectBrand(carbrandname) {
    this.allhttprequestservice.editRemoteShell.compitablebrands.push(carbrandname);
  }

  _removeSelectBrand(carbrandname: string) {
    const index = this.allhttprequestservice.editRemoteShell.compitablebrands.indexOf(carbrandname, 0);
    if (index > -1) {
      this.allhttprequestservice.editRemoteShell.compitablebrands.splice(index, 1);
    }
  }

    // perform add new component to the remote
    onClickAddNew(newitemCategory: string) {
      this.modelController.onClickAddNewRemoteComponent(newitemCategory);
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

}
