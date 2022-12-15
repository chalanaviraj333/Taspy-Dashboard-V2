import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { GarageRemote } from 'src/app/interfaces/garage-remote';
import { AllGarageRemoteService } from 'src/app/services/all-garage-remote.service';

@Component({
  selector: 'app-all-garage-remotes',
  templateUrl: './all-garage-remotes.page.html',
  styleUrls: ['./all-garage-remotes.page.scss'],
})
export class AllGarageRemotesPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  public hideButton: boolean = false;

  constructor(public garageRemoteService:AllGarageRemoteService) { }

  ngOnInit() {
    this.garageRemoteService.getAllGarageRemotes();
  }

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

    // perform view remote detail page loading
  async onClick(selectedRemote: GarageRemote) {
    // await this.modelService.onClickViewItem(selectedRemote);
  }

}
