import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RemoteDetailModalPagePage } from '../carremote/remote-detail-modal-page/remote-detail-modal-page.page';
import { Remote } from '../remote';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  constructor(public modalController: ModalController) { }

  async onClickViewItem(selectedRemote: Remote) {
    const modal = await this.modalController.create({
      component: RemoteDetailModalPagePage,
      componentProps: {
        "selectedRemote": selectedRemote
      },
      cssClass: 'view-Remote-Details-class',
      swipeToClose: true,
    });
    return await modal.present();
  }
}
