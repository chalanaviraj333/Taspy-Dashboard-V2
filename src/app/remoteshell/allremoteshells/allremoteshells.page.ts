import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonContent, IonSearchbar } from '@ionic/angular';
import { RemoteShell } from 'src/app/interfaces/remote-shell';
import { Remote } from 'src/app/remote';
import { HttpRequestServiceService } from 'src/app/services/http-request-service.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { RemoteShellPhotoRequestService } from 'src/app/services/remote-shell-photo-request.service';

@Component({
  selector: 'app-allremoteshells',
  templateUrl: './allremoteshells.page.html',
  styleUrls: ['./allremoteshells.page.scss'],
})
export class AllremoteshellsPage implements OnInit, OnDestroy {

  @ViewChild("search", { static: false }) search: IonSearchbar;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  public searchedItem: Array<Remote> = [];
  public hideButton: boolean = false;

  constructor(
    private modelService: ModalServiceService,
    private router: Router,
    public alertController: AlertController,
    public allhttprequestservice: HttpRequestServiceService,
    public remoteShellPhotoService: RemoteShellPhotoRequestService
  ) {}

  ngOnInit() {

    this.allhttprequestservice.getAllRemoteShells();
  }

  ngOnDestroy() {}

  // quick go to top button on page
  logScrollStart() {
    setTimeout(() => {
      this.hideButton = true;
    }, 500);
  }

  ScrollToTop() {
    this.content.scrollToTop(1500);
    setTimeout(() => {
      this.hideButton = false;
    }, 4000);
  }


  // perform search based on search bar enteded data
  _ionChange(event) {
    const entervalue = event.target.value;
    this.allhttprequestservice.performSearchRemoteShell(entervalue);

  }

// perform view remote detail page loading
  async onClick(selectedRemote: Remote) {
    await this.modelService.onClickViewItem(selectedRemote);
  }

// perform edit remote funtion
  onClickEditRemoteShell(event, remoteshell: RemoteShell) {
    this.router.navigateByUrl('editremoteshell/' + remoteshell.tapsycode);

    // this use to prevent loading remote detail view model when user click on edit or delete button inside card
    event.stopPropagation();
  }

  // perform delete remote funtion
  onClickDelete(event, remoteshell: RemoteShell) {
    this.presentAlertConfirm(remoteshell);

    // this use to prevent loading remote detail view model when user click on edit or delete button inside card
    event.stopPropagation();
  }

  onClickEDownloadImage(event, remoteshell: RemoteShell) {
    this.remoteShellPhotoService.downloadPhoto(remoteshell);

    // this use to prevent loading remote detail view model when user click on edit or delete button inside card
    event.stopPropagation();
  }


  // delete alert controller
  async presentAlertConfirm(remoteshell: RemoteShell) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete!',
      message: '<strong>Are you want to DELETE this remote?</strong>',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Yes',
          handler: () => {
            // this.allhttprequestservice.deleteRemote(remote);
          }
        }
      ]
    });

    await alert.present();
  }

}
