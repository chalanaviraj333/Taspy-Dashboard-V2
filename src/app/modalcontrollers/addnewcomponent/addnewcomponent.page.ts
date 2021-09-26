import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from "@angular/forms";
import { HttpRequestServiceService } from 'src/app/services/http-request-service.service';

@Component({
  selector: 'app-addnewcomponent',
  templateUrl: './addnewcomponent.page.html',
  styleUrls: ['./addnewcomponent.page.scss'],
})
export class AddnewcomponentPage implements OnInit {

  @Input() addnewCategory : string;

  constructor(private modalController: ModalController, private allhttprequestservice: HttpRequestServiceService) { }

  ngOnInit() {
  }

  _onClickDismiss() {
    this.modalController.dismiss();
  }

  onSubmit(form: NgForm) {

    const newItemValue: string = form.value.newcomponent.toUpperCase();;

    this.allhttprequestservice.addnewremotecomponent(this.addnewCategory, newItemValue);
    this.modalController.dismiss();
  }

}
