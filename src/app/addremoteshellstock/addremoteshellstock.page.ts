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
    recentAddedQuantity: 0,
    recentmoreStockAddDate: new Date(),
    totalSale: 0,
    moreStock: false,
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
    this.allhttprequestservice.addedStockItemsRemoteShell.push({tapsycode: this.selectedTapsyCode, addedquantity: form.value.enteredQuantity, downstairsStock: form.value.downstairsStcokValue});
  }

  onSubmitMoreStockDownstairs(form: NgForm) {
    this.allhttprequestservice.addedMoreStockTodownstairsShells.push(this.selectedTapsyCode);
  }

  onClickUpload() {
    this.allhttprequestservice.addNewRemoteShellStock();
  }

  onClickUploadMoreStock() {
    this.allhttprequestservice.addMoreStockTODownstairsRemoteShell();
  }
}
