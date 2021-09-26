import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseServiceService } from 'src/app/database-service.service';
import { Remote } from 'src/app/remote';

@Component({
  selector: 'app-remote-detail-modal-page',
  templateUrl: './remote-detail-modal-page.page.html',
  styleUrls: ['./remote-detail-modal-page.page.scss'],
})
export class RemoteDetailModalPagePage implements OnInit {

  @Input() selectedRemote : Remote;

  constructor(private modalController: ModalController, private databaseService: DatabaseServiceService) { }

  ngOnInit() {
  }

  _onClickDismiss() {
    this.modalController.dismiss();
  }

}
