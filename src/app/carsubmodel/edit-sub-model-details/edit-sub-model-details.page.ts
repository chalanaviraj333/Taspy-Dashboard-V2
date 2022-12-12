import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { CarSubModel } from 'src/app/interfaces/car-sub-model';
import { AllHttpServicesService } from 'src/app/services/all-http-services.service';
import { CommonPhotoArrayUploadServiceService } from 'src/app/services/common-photo-array-upload-service.service';
import { HttpRequestServiceService } from 'src/app/services/http-request-service.service';
import { UserPhoto } from 'src/app/user-photo';

@Component({
  selector: 'app-edit-sub-model-details',
  templateUrl: './edit-sub-model-details.page.html',
  styleUrls: ['./edit-sub-model-details.page.scss'],
})
export class EditSubModelDetailsPage implements OnInit {

  public selectedSubModel: CarSubModel = {key: '', brand: '', model: '', submodel: '', typeofignition: '', icon: '', useruploadImage: '', uploadremotephoto: '', startyear: 2001, endyear: 2002, compatibleremotes: [], compatibleremoteshells: [], chipID: '', freq: '', profile: '',
  allLostKeyPrice: 0, spareKeyPrice: 0, compatibleDevices: [], allLostKeySpecialNotes: [], spareKeySpecialNotes: [], allLostKeyPriceUpdateDate: new Date, spareKeyPriceUpdateDate: new Date};
  public modelstartYear: string = '';
  public modelendYear: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    public databaseService: AllHttpServicesService,
    public allhttprequestservice: HttpRequestServiceService,
    public actionSheetController: ActionSheetController,
    public commonphotoArrayUploadService: CommonPhotoArrayUploadServiceService
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
  }

  onSubmitNext(form: NgForm) {
    // this.commonphotoArrayUploadService.uploadimages(this.selectedSubModel);
    this.selectedSubModel.typeofignition = form.value.typeofignition;
    this.selectedSubModel.chipID = form.value.carchip;
    this.selectedSubModel.profile = form.value.remoteblade;
    this.selectedSubModel.freq = form.value.carfrequency;
    this.selectedSubModel.startyear = form.value.selectedSubModelStartYear;
    this.selectedSubModel.endyear = form.value.selectedSubModelEndYear;

    this.allhttprequestservice.updateSubModelData(this.selectedSubModel);
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

}
