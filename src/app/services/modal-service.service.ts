import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddVerifiedProductPage } from '../add-verified-product/add-verified-product.page';
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

  async onClickAddVerifiedProduct(selectedsubmodelbrand: string, subModelKey: string, buttontype: string, modelstartyear: number, modelendyear: number) {
    const modal = await this.modalController.create({
      component: AddVerifiedProductPage,
      componentProps: {
        "selectedsubmodelbrand": selectedsubmodelbrand,
        "subModelKey": subModelKey,
        "buttontype": buttontype,
        "modelstartyear": modelstartyear,
        "modelendyear": modelendyear
      },
      cssClass: 'add-compatible-product-class',
      swipeToClose: true,
    });
    return await modal.present();
  }
}
