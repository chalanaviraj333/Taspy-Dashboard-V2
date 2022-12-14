import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CarSubModel } from '../interfaces/car-sub-model';
import { AllHttpServicesService } from '../services/all-http-services.service';
import { ModalServiceService } from '../services/modal-service.service';

@Component({
  selector: 'app-car-sub-model-info',
  templateUrl: './car-sub-model-info.page.html',
  styleUrls: ['./car-sub-model-info.page.scss'],
})
export class CarSubModelInfoPage implements OnInit {

  public value: string = 'chalana did it';

  public selectedSubModel: CarSubModel = {key: '', brand: '', model: '', submodel: '', typeofignition: '', icon: '', useruploadImage: '', uploadremotephoto: '', startyear: 2001, endyear: 2002, remotempn: '', remotempnprice: 0, compatibleremotes: [], compatibleremoteshells: [], compatibleKDRemotes: [], compatibleXhorseRemote: [], chipID: '', freq: '', profile: '',
  allLostKeyPrice: 0, spareKeyPrice: 0, compatibleDevicesSpare: [], compatibleDevicesAllLost: [], allLostKeySpecialNotes: [], spareKeySpecialNotes: [], allLostKeyPriceUpdateDate: new Date, spareKeyPriceUpdateDate: new Date};
  public modelstartYear: string = '';
  public modelendYear: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private modelService: ModalServiceService, public otherhttpRequest: AllHttpServicesService) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (
        !paramMap.has(
        "startyear" && "endyear"
        )
      ) {
        // redirect
        return;
      }
      this.modelstartYear = paramMap.get("startyear");
      this.modelendYear = paramMap.get("endyear");
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.selectedSubModel = JSON.parse(params["data"])
    });
   }

  ngOnInit() {
    this.otherhttpRequest.getAllCarSubModels(this.selectedSubModel.brand, this.selectedSubModel.model);

    this.otherhttpRequest.verifiedRemotes = [];
    if (this.selectedSubModel.compatibleremotes !== undefined) {
      this.otherhttpRequest.getVerifiedRemotes(this.selectedSubModel.compatibleremotes);
    }

    this.otherhttpRequest.verifiedKEYDIYProds = [];
    if (this.selectedSubModel.compatibleKDRemotes !== undefined) {
      this.otherhttpRequest.getVerifiedKEYDIYProds(this.selectedSubModel.compatibleKDRemotes);
    }
  }

  onclickSubMOdelEdit() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "data": JSON.stringify(this.selectedSubModel)
      }
    }

      this.router.navigate(
      ["car-brand-page/car-model-page/car-sub-model-page/edit-sub-model-details/" + this.modelstartYear + '/' + this. modelendYear],
      navigationExtras);
  }

  onCLickAddVerifiedRemote(selectedsubmodelbrand: string) {
    const subModelKey: string = this.selectedSubModel.key;
    const buttontype: string = 'addremote';
    const modelstartyear: number = this.selectedSubModel.startyear;
    const modelendyear: number = this.selectedSubModel.endyear;

    this.modelService.onClickAddVerifiedProduct(selectedsubmodelbrand, subModelKey, buttontype, modelstartyear, modelendyear);
  }

  // add keydiy product
  onCLickAddVerifiedKEYDIY(selectedsubmodelbrand: string) {
    const subModelKey: string = this.selectedSubModel.key;
    const buttontype: string = 'addkeydiyProd';
    const modelstartyear: number = this.selectedSubModel.startyear;
    const modelendyear: number = this.selectedSubModel.endyear;

    this.modelService.onClickAddVerifiedProduct(selectedsubmodelbrand, subModelKey, buttontype, modelstartyear, modelendyear);

  }

  onSubmitAllLostKeyPrice(form: NgForm) {
    this.selectedSubModel.allLostKeyPrice = form.value.allLostKeyPrice;
    this.selectedSubModel.allLostKeyPriceUpdateDate = new Date();
      this.selectedSubModel.allLostKeySpecialNotes = [];
      this.selectedSubModel.spareKeySpecialNotes = [];


    if (form.value.eprom == true) {
      this.selectedSubModel.allLostKeySpecialNotes.push('EPROM Programming');
    }
    if (form.value.twokeysmust == true) {
      this.selectedSubModel.allLostKeySpecialNotes.push('Two Keys Required');
    }
    if (form.value.keydiycompatible == true) {
      this.selectedSubModel.allLostKeySpecialNotes.push('KEYDIY Compatible');
      this.selectedSubModel.spareKeySpecialNotes.push('KEYDIY Compatible');
    }
    if (form.value.genuineonly == true) {
      this.selectedSubModel.allLostKeySpecialNotes.push('Genuine Key Only');
      this.selectedSubModel.spareKeySpecialNotes.push('Genuine Key Only');
    }

    this.otherhttpRequest.updateCarSubmodelDetails(this.selectedSubModel);
  }

  editAllLostKeyData() {
    this.selectedSubModel.allLostKeyPrice = 0;
  }

  editSpareKeyData() {
    this.selectedSubModel.spareKeyPrice = 0;
  }

  onSubmitSpareKeyPrice(form: NgForm) {
    this.selectedSubModel.spareKeyPrice = form.value.spareKeyPrice;
    this.selectedSubModel.spareKeyPriceUpdateDate = new Date();
      this.selectedSubModel.spareKeySpecialNotes = [];

    if (form.value.keydiycompatible == true) {
      this.selectedSubModel.spareKeySpecialNotes.push('KEYDIY Compatible');
    }
    if (form.value.genuineonly == true) {
      this.selectedSubModel.spareKeySpecialNotes.push('Genuine Key Only');
    }

    this.otherhttpRequest.updateCarSubmodelDetails(this.selectedSubModel);
  }


}
