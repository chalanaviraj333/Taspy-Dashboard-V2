import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RemoteShell } from '../interfaces/remote-shell';
import { HttpRequestServiceService } from '../services/http-request-service.service';

@Component({
  selector: 'app-addremoteshellstock',
  templateUrl: './addremoteshellstock.page.html',
  styleUrls: ['./addremoteshellstock.page.scss'],
})
export class AddremoteshellstockPage implements OnInit {

  public selectedTapsyCode : string = '';
  public selectedRemoteshell: RemoteShell = {
    key: '',
    tapsycode: '',
    boxnumber: 0,
    shell: '',
    remotetype: '',
    qtyavailable: 0,
    productType: '',
    compitablebrands: [],
    image: '',
    inbuildblade: '',
    buttons: 0,
    notes: [],
    compitablecars: []
  }

  constructor(public allhttprequestservice: HttpRequestServiceService) { }

  ngOnInit() {
    if (this.allhttprequestservice.allRemoteShellTapsyCodes.length == 0) {
      this.allhttprequestservice.getAllRemoteShellsTapsycodes();
    }
    if (this.allhttprequestservice.allRemoteShells.length == 0) {
      this.allhttprequestservice.getAllRemoteShells();
    }
  }

  _remotesearchOnType(event) {
    const entervalue = event.target.value;
    this.allhttprequestservice.performremoteshellTapsycodeSearch(entervalue);
  }

  onClickSelectCode(tapsycode: string) {
      this.selectedTapsyCode = tapsycode;
      this.allhttprequestservice.allRemoteShells.forEach(remoteshell => {
          if (remoteshell.tapsycode === this.selectedTapsyCode) {
            this.selectedRemoteshell = remoteshell;
          }
      });
  }

  onSubmitNext(form: NgForm) {
    this.allhttprequestservice.addedStockItemsRemoteShell.push({tapsycode: this.selectedTapsyCode, addedquantity: form.value.enteredQuantity});
  }

  onClickUpload() {
    this.allhttprequestservice.addNewRemoteShellStock();
  }
}
