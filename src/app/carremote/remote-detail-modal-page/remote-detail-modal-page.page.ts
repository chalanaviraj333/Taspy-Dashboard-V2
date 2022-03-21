import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Remote } from 'src/app/remote';

@Component({
  selector: 'app-remote-detail-modal-page',
  templateUrl: './remote-detail-modal-page.page.html',
  styleUrls: ['./remote-detail-modal-page.page.scss'],
})
export class RemoteDetailModalPagePage implements OnInit {

  @Input() selectedRemote : Remote;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  _onClickDismiss() {
    this.modalController.dismiss();
  }

}
