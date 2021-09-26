import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { KeyShells } from 'src/app/key-shells';

@Component({
  selector: 'app-notaddedkeyshells',
  templateUrl: './notaddedkeyshells.page.html',
  styleUrls: ['./notaddedkeyshells.page.scss'],
})
export class NotaddedkeyshellsPage implements OnInit {
  private allRemoteShells: Array<KeyShells> = [];
  public filterRemoteShells: Array<KeyShells> = [];
  private addedShellsTapsyCodes: Array<string> = [];

  constructor(
    private http: HttpClient,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.http
      .get<{ [key: string]: KeyShells }>(
        'https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells.json'
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            this.allRemoteShells.push({
              key,
              tapsycode: resData[key].tapsycode,
              boxnumber: Number(resData[key].boxnumber),
              remotetype: resData[key].remotetype,
              productType: resData[key].productType,
              compitablebrands: resData[key].compitablebrands,
              image: resData[key].image,
              qtyavailable: resData[key].qtyavailable,
              inbuildblade: resData[key].inbuildblade,
              buttons: resData[key].buttons,
              notes: resData[key].notes,
              addedtoShopify: false,
            });

            this.allRemoteShells.sort((a, b) =>
              a.boxnumber > b.boxnumber ? 1 : -1
            );
          }
        }
      });

    this.http
      .get(
        'https://tapsystock-a6450-default-rtdb.firebaseio.com/shopify-added-key-shells.json'
      )
      .subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            this.addedShellsTapsyCodes.push(resData[key].tapsycode);
          }
        }
      });

    this.filterRemoteShells = this.allRemoteShells;


  }

  _ionChange(event) {
    const entervalue = event.target.value;

    this.filterRemoteShells = this.allRemoteShells;

    if (entervalue && entervalue.trim() != '') {
      this.filterRemoteShells = this.filterRemoteShells.filter(
        (currentremote) => {
          if (currentremote.compitablebrands !== undefined) {
            let searchWord =
              currentremote.boxnumber + currentremote.tapsycode +
              currentremote.inbuildblade +
              currentremote.compitablebrands.toString();
            return (
              searchWord.toLowerCase().indexOf(entervalue.toLowerCase()) > -1
            );
          } else {
            let searchWord =
              currentremote.boxnumber + currentremote.inbuildblade + currentremote.tapsycode;
            return (
              searchWord.toLowerCase().indexOf(entervalue.toLowerCase()) > -1
            );
          }
        }
      );
    }
  }

  onClickAddedToShopify(tapsycode: string) {
    const selectedProduct: KeyShells = this.allRemoteShells.find(product => (product.tapsycode === tapsycode));

    selectedProduct.addedtoShopify = true;

    this.http
      .post(
        'https://tapsystock-a6450-default-rtdb.firebaseio.com/shopify-added-key-shells.json',
        { tapsycode }
      )
      .subscribe((resData) => {
        const selectedProductIndex = this.filterRemoteShells.findIndex(
          (product) => product.tapsycode === tapsycode
        );

        this.filterRemoteShells.splice(selectedProductIndex, 1);
        this.filterRemoteShells.push(selectedProduct);
      });
  }

  onClickAddedCheck() {
    this.filterRemoteShells.forEach(remoteshell => {

        this.addedShellsTapsyCodes.forEach(tapsyCodeAdded => {
          if (tapsyCodeAdded == remoteshell.tapsycode) {
            remoteshell.addedtoShopify = true;
          }
        });
    });

  }
}
