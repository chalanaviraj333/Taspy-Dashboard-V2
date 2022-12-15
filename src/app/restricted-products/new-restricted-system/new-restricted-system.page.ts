import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';

export interface UnitKey {
  unitNo: number;
  pinOne: number;
  pinTwo: number;
  pinThree: number;
  pinFour: number;
  pinFive: number;
  pinSix: number;
}

export interface MasterKey {
  pinOne: Array<number>;
  pinTwo: Array<number>;
  pinThree: Array<number>;
  pinFour: Array<number>;
  pinFive: Array<number>;
  pinSix: Array<number>;
}

export interface UnitCylinder {
  unitNo: number;
  pinOne: Array<number>;
  pinTwo: Array<number>;
  pinThree: Array<number>;
  pinFour: Array<number>;
  pinFive: Array<number>;
  pinSix: Array<number>;
}

@Component({
  selector: 'app-new-restricted-system',
  templateUrl: './new-restricted-system.page.html',
  styleUrls: ['./new-restricted-system.page.scss'],
})
export class NewRestrictedSystemPage implements OnInit {

  public unitKeys: Array<UnitKey> = [];
  public unitCylinders: Array<UnitCylinder> = [];
  public unitKeysDuplicateCheck: Array<number> = [];
  private min: number = 111111;
  private max: number = 222222;
  public masterKey: MasterKey = {pinOne: [], pinTwo: [], pinThree: [], pinFour: [], pinFive: [], pinSix: []};

  constructor(private toastController: ToastController) { }

  ngOnInit() {
  }

  onSubmitForm(form: NgForm) {
    const unitAmount: number = form.value.unitAmount;

    for(let i = 0; i <= unitAmount; i++) {
      const newkey: number = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
      this.unitKeysDuplicateCheck.push(newkey);

      const keyPinNumbers: Array<string> = (newkey.toString().split('', 6));

      this.unitKeys.push({unitNo: i, pinOne: Number(keyPinNumbers[0]), pinTwo: Number(keyPinNumbers[1]), pinThree: Number(keyPinNumbers[2]), pinFour: Number(keyPinNumbers[3]), pinFive: Number(keyPinNumbers[4]), pinSix: Number(keyPinNumbers[5])});
    }


  }

  async onClickCheckDuplicates() {
    let duplicatedArray = this.unitKeysDuplicateCheck.reduce(function(acc, el, i, arr) {
      if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
    }, []);

   if (duplicatedArray.length == 0 ){
    const toast = await this.toastController.create({
      message: 'No Duplicates Found.',
      duration: 4000,
      position: 'top',
      color: 'dark',
    });
    toast.present();
   }
   else {
    const toast = await this.toastController.create({
      message: 'Duplicates Found.',
      duration: 4000,
      position: 'top',
      color: 'dark',
    });
    toast.present();

   }
  }

generateUnitCylinder() {
  const masterkeyofArray: UnitKey = this.unitKeys[0];
  console.log(masterkeyofArray);
  this.unitKeys.forEach(key => {
      if (key.pinOne > masterkeyofArray.pinOne) {
      }
  });
}

onClickCheckMaster() {
  const masterlockwithDuplicates: MasterKey = {pinOne: [], pinTwo: [], pinThree: [], pinFour: [], pinFive: [], pinSix: []};

  this.unitKeys.forEach(unitkey => {
    masterlockwithDuplicates.pinOne.push(unitkey.pinOne);
    masterlockwithDuplicates.pinTwo.push(unitkey.pinTwo);
    masterlockwithDuplicates.pinThree.push(unitkey.pinThree);
    masterlockwithDuplicates.pinFour.push(unitkey.pinFour);
    masterlockwithDuplicates.pinFive.push(unitkey.pinFive);
    masterlockwithDuplicates.pinSix.push(unitkey.pinSix);

    masterlockwithDuplicates.pinOne.sort((a, b) => (a > b ? 1 : -1));
    masterlockwithDuplicates.pinTwo.sort((a, b) => (a > b ? 1 : -1));
    masterlockwithDuplicates.pinThree.sort((a, b) => (a > b ? 1 : -1));
    masterlockwithDuplicates.pinFour.sort((a, b) => (a > b ? 1 : -1));
    masterlockwithDuplicates.pinFive.sort((a, b) => (a > b ? 1 : -1));
    masterlockwithDuplicates.pinSix.sort((a, b) => (a > b ? 1 : -1));

    this.masterKey.pinOne = masterlockwithDuplicates.pinOne.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });
    this.masterKey.pinTwo = masterlockwithDuplicates.pinTwo.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });
    this.masterKey.pinThree = masterlockwithDuplicates.pinThree.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });
    this.masterKey.pinFour = masterlockwithDuplicates.pinFour.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });
    this.masterKey.pinFive = masterlockwithDuplicates.pinFive.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });
    this.masterKey.pinSix = masterlockwithDuplicates.pinSix.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });

  });

  this.generateUnitCylinder();
}

}
