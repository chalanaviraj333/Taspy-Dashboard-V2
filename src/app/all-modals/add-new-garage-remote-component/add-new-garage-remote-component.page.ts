import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AllGarageRemoteService } from 'src/app/services/all-garage-remote.service';

@Component({
  selector: 'app-add-new-garage-remote-component',
  templateUrl: './add-new-garage-remote-component.page.html',
  styleUrls: ['./add-new-garage-remote-component.page.scss'],
})
export class AddNewGarageRemoteComponentPage implements OnInit {

  @Input() addnewCategory : string;

  constructor(private modalController: ModalController, private garageRemotesHttpRequests: AllGarageRemoteService) { }

  ngOnInit() {
  }

  _onClickDismiss() {
    this.modalController.dismiss();
  }

  onSubmit(form: NgForm) {

    const newItemValue: string = form.value.newcomponent.toUpperCase();;

    this.garageRemotesHttpRequests.addnewComponent(this.addnewCategory, newItemValue);
    this.modalController.dismiss();
  }

}
