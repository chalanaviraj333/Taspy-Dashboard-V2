import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpRequestServiceService } from 'src/app/services/http-request-service.service';

@Component({
  selector: 'app-add-remote-stock',
  templateUrl: './add-remote-stock.page.html',
  styleUrls: ['./add-remote-stock.page.scss'],
})
export class AddRemoteStockPage implements OnInit {

  selectedTapsyCode : string = '';

  constructor(public allhttprequestservice: HttpRequestServiceService) { }

  ngOnInit() {
    if (this.allhttprequestservice.allRemoteTapsyCodes.length == 0) {
      this.allhttprequestservice.getAllRemoteTapsycodes();
    }
    if (this.allhttprequestservice.allRemotes.length == 0) {
      this.allhttprequestservice.getAllRemotes();
    }
  }

  _remotesearchOnType(event) {
    const entervalue = event.target.value;
    this.allhttprequestservice.performcurrenctPairSearch(entervalue);
  }

  onClickSelectCode(tapsycode: string) {
      this.selectedTapsyCode = tapsycode;
      this.allhttprequestservice.filteredtapsycode = [];
  }

  onSubmitNext(form: NgForm) {
    this.allhttprequestservice.addedStockItems.push({tapsycode: this.selectedTapsyCode, addedquantity: form.value.enteredQuantity, downstairsStock: form.value.downstairsStcokValue});
  }

  onClickUpload() {
    this.allhttprequestservice.addNewRemoteStock();
  }

}
