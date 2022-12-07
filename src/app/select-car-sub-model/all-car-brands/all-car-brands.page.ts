import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonSearchbar } from '@ionic/angular';
import { AllHttpServicesService } from 'src/app/services/all-http-services.service';

@Component({
  selector: 'app-all-car-brands',
  templateUrl: './all-car-brands.page.html',
  styleUrls: ['./all-car-brands.page.scss'],
})
export class AllCarBrandsPage implements OnInit {

  @ViewChild('search', { static: false }) search: IonSearchbar;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  public hideButton: boolean = false;

  constructor(public httpService: AllHttpServicesService, private router: Router) { }

  ngOnInit() {
    this.httpService.getallCarBrandsFromDatabase();
  }

  logScrollStart() {
    setTimeout(() => {
      this.hideButton = true;
    }, 500);
  }

  ScrollToTop(){
    this.content.scrollToTop(1500);
    setTimeout(() => {
      this.hideButton = false;
    }, 4000);

  }

  onClickCarBrand(selectedcarbrand : string) {
    this.router.navigateByUrl('car-brand-page/car-model-page/' + selectedcarbrand);
  }

}
