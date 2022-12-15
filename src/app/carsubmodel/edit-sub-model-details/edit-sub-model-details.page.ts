import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { CarSubModel } from 'src/app/interfaces/car-sub-model';
import { AllHttpServicesService } from 'src/app/services/all-http-services.service';
import { CarSubModelEditService } from 'src/app/services/car-sub-model-edit.service';
import { CommonPhotoArrayUploadServiceService } from 'src/app/services/common-photo-array-upload-service.service';
import { HttpRequestServiceService } from 'src/app/services/http-request-service.service';
import { UserPhoto } from 'src/app/user-photo';

export interface ProgramDevices {
  devicename: string;
  checkedvalue: boolean;
}

@Component({
  selector: 'app-edit-sub-model-details',
  templateUrl: './edit-sub-model-details.page.html',
  styleUrls: ['./edit-sub-model-details.page.scss'],
})
export class EditSubModelDetailsPage implements OnInit {

  public selectedSubModel: CarSubModel = {key: '', brand: '', model: '', submodel: '', typeofignition: '', icon: '', useruploadImage: '', uploadremotephoto: '', startyear: 2001, endyear: 2002, compatibleremotes: [], compatibleremoteshells: [], compatibleKDRemotes: [], compatibleXhorseRemote: [], chipID: '', freq: '', profile: '',
  allLostKeyPrice: 0, spareKeyPrice: 0, compatibleDevicesSpare: [], compatibleDevicesAllLost: [], allLostKeySpecialNotes: [], spareKeySpecialNotes: [], allLostKeyPriceUpdateDate: new Date, spareKeyPriceUpdateDate: new Date};
  public modelstartYear: string = '';
  public modelendYear: string = '';

  public programmingDevicesSpare: Array<ProgramDevices> = [
    {devicename: 'SmartPro', checkedvalue: false},
    {devicename: 'SmartPro with Aerial', checkedvalue: false},
    {devicename: 'X-Tool', checkedvalue: false},
    {devicename: 'Autel', checkedvalue: false},
    {devicename: 'VVDI Key Plus', checkedvalue: false},
    {devicename: 'G-Scan', checkedvalue: false},
    {devicename: 'Super VAG', checkedvalue: false},
    {devicename: 'KEYDIY Chip Clone', checkedvalue: false},
    {devicename: 'VVDI Chip Clone', checkedvalue: false},
  ];

  public programmingDevicesAllLost: Array<ProgramDevices> = [
    {devicename: 'SmartPro', checkedvalue: false},
    {devicename: 'SmartPro with Aerial', checkedvalue: false},
    {devicename: 'X-Tool', checkedvalue: false},
    {devicename: 'Autel', checkedvalue: false},
    {devicename: 'VVDI Key Plus', checkedvalue: false},
    {devicename: 'G-Scan', checkedvalue: false},
    {devicename: 'Super VAG', checkedvalue: false},
    {devicename: 'KEYDIY Chip Clone', checkedvalue: false},
    {devicename: 'VVDI Chip Clone', checkedvalue: false},
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    public databaseService: AllHttpServicesService,
    public allhttprequestservice: HttpRequestServiceService,
    public actionSheetController: ActionSheetController,
    public commonphotoArrayUploadService: CommonPhotoArrayUploadServiceService,
    public carSubModelService: CarSubModelEditService
  ) {

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
    this.allhttprequestservice.getAllRemoteBlade();
    this.allhttprequestservice.getAllRemoteChips();
    this.allhttprequestservice.getAllRemoteFrequency();
    this.carSubModelService.carsubmodelImage.webviewPath = this.selectedSubModel.icon;
    this.carSubModelService.carFrontPhoto.webviewPath = this.selectedSubModel.useruploadImage;
    this.carSubModelService.carRemoteLookslike.webviewPath = this.selectedSubModel.uploadremotephoto;

    if (this.selectedSubModel.compatibleDevicesSpare !== undefined) {
      this.selectedSubModel.compatibleDevicesSpare.forEach(device => {
        this.programmingDevicesSpare.find((i) => i.devicename == device).checkedvalue = true;
    });
    }

    if (this.selectedSubModel.compatibleDevicesAllLost !== undefined) {
      this.selectedSubModel.compatibleDevicesAllLost.forEach(device => {
        this.programmingDevicesAllLost.find((i) => i.devicename == device).checkedvalue = true;
    });
    }

  }

  onSubmitNext(form: NgForm) {
    this.selectedSubModel.typeofignition = form.value.typeofignition;
    this.selectedSubModel.chipID = form.value.carchip;
    this.selectedSubModel.profile = form.value.remoteblade;
    this.selectedSubModel.freq = form.value.carfrequency;
    this.selectedSubModel.startyear = form.value.selectedSubModelStartYear;
    this.selectedSubModel.endyear = form.value.selectedSubModelEndYear;

    this.selectedSubModel.compatibleDevicesSpare = [];

    this.programmingDevicesSpare.forEach(device => {
      if (device.checkedvalue == true) {
        this.selectedSubModel.compatibleDevicesSpare.push(device.devicename);
      }
    });

    this.selectedSubModel.compatibleDevicesAllLost = [];

    this.programmingDevicesAllLost.forEach(device => {
      if (device.checkedvalue == true) {
        this.selectedSubModel.compatibleDevicesAllLost.push(device.devicename);
      }
    });

    this.carSubModelService.uploadSubCarModel(this.selectedSubModel);
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.commonphotoArrayUploadService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
         }
      }]
    });
    await actionSheet.present();
  }

  updateDeviceCheckedSpare(indexofdevice: number) {
    this.programmingDevicesSpare[indexofdevice].checkedvalue = !this.programmingDevicesSpare[indexofdevice].checkedvalue;
  }

  updateDeviceCheckedAllLost(indexofdevice: number) {
    this.programmingDevicesAllLost[indexofdevice].checkedvalue = !this.programmingDevicesAllLost[indexofdevice].checkedvalue;
  }

}
