import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonSearchbar } from '@ionic/angular';
import { AllHttpServicesService } from 'src/app/services/all-http-services.service';

@Component({
  selector: 'app-car-model-page',
  templateUrl: './car-model-page.page.html',
  styleUrls: ['./car-model-page.page.scss'],
})
export class CarModelPagePage implements OnInit {

  @ViewChild("search", { static: false }) search: IonSearchbar;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  public selectedBrand: string;
  public hideButton: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public databaseService: AllHttpServicesService
  ) {

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("brandId")) {
        // redirect
        return;
      }
      this.selectedBrand = paramMap.get("brandId");
    });
  }

  ngOnInit() {

    this.databaseService.getAllCarModels(this.selectedBrand);
  }

  onClick(x, startyear, endyear) {
    const selectedModel = x;

    this.router.navigateByUrl(
      "car-brand-page/car-model-page/car-sub-model-page/" +
        this.selectedBrand +
        "/" +
        selectedModel +
        "/" +
        startyear +
        "/" +
        endyear
    );
  }



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

}
