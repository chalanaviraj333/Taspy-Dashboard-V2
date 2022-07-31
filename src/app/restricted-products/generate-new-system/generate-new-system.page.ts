import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface KeyDepth {
  position: number;
  depth: number;
}

export interface ChamberAvailable {
  chamberNo: number;
  master: number;
  available: Array<number>;
}

export interface UnitKey {
  unitNumber: number;
  positonNDepth: Array<KeyDepth>;
}

@Component({
  selector: 'app-generate-new-system',
  templateUrl: './generate-new-system.page.html',
  styleUrls: ['./generate-new-system.page.scss'],
})
export class GenerateNewSystemPage implements OnInit {

  public masterkey: Array<KeyDepth> = [];
  public availableChamberPins: Array<ChamberAvailable> = [];
  private oddnumbers: Array<number> = [1,,3,5,7,9];
  private evennumbers: Array<number> = [0,2,4,6,8];
  public unitsAmount: number = 0;
  public unitKeys: Array<UnitKey> = [];
  private unitNumber: number = 1;

  constructor() { }

  ngOnInit() {
  }

  getavailbePinsUp(arr: Array<number>, index: number) {
    return arr.filter(function(value, arrIndex) {
      // return index !== arrIndex
      return index < arrIndex
    });
  }

  getavailbePinsDown(arr: Array<number>, index: number) {
    return arr.filter(function(value, arrIndex) {
      return index > arrIndex
    });
  }


  assignMaster(masterKey: Array<KeyDepth>) {
    this.masterkey.forEach(keydepth => {
      if (keydepth.depth % 2 == 0) {
        const selectedmasterIndex = this.evennumbers.indexOf(keydepth.depth, 0);
        const availabepinArrayUp = this.getavailbePinsUp(this.evennumbers, selectedmasterIndex);
        const availabepinArrayDown = this.getavailbePinsDown(this.evennumbers, selectedmasterIndex);
        this.availableChamberPins.push({chamberNo: keydepth.position, master: keydepth.depth, available: availabepinArrayUp.concat(availabepinArrayDown)});
      }
      else {
        const selectedmasterIndex = this.oddnumbers.indexOf(keydepth.depth, 0);
        const availabepinArrayUp = this.getavailbePinsUp(this.oddnumbers, selectedmasterIndex);
        const availabepinArrayDown = this.getavailbePinsDown(this.oddnumbers, selectedmasterIndex);
        this.availableChamberPins.push({chamberNo: keydepth.position, master: keydepth.depth, available: availabepinArrayUp.concat(availabepinArrayDown)});
      }
    });
  }

  onSubmitMasterForm(form: NgForm) {
    this.masterkey.push({position: 1, depth: form.value.masterChamber1}, {position: 2, depth: form.value.masterChamber2}, {position: 3, depth: form.value.masterChamber3},
      {position: 4, depth: form.value.masterChamber4},{position: 5, depth: form.value.masterChamber5}, {position: 6, depth: form.value.masterChamber6});

      this.assignMaster(this.masterkey);
  }

  onSubmitUnitAmount() {
    const unitAmount: number = this.unitsAmount;

    for(let i = 0; i <= unitAmount; i++) {

    }
  }

  onSubmitUnitForm(form: NgForm) {

    const postiondepthArray: Array<KeyDepth> = [{position: 1, depth: form.value.unitChamber1}, {position: 2, depth: form.value.unitChamber2}, {position: 3, depth: form.value.unitChamber3}, {position: 4, depth: form.value.unitChamber4},
      {position: 5, depth: form.value.unitChamber5}, {position: 6, depth: form.value.unitChamber6}]


    this.unitKeys.push({unitNumber: this.unitNumber, positonNDepth: postiondepthArray});
    this.unitNumber++;
  }





}
