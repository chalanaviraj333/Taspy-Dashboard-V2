import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllHttpServicesService } from 'src/app/services/all-http-services.service';

@Component({
  selector: 'app-all-car-sub-model',
  templateUrl: './all-car-sub-model.page.html',
  styleUrls: ['./all-car-sub-model.page.scss'],
})
export class AllCarSubModelPage implements OnInit {

  public selectedBrand: string;
  public selectedModel: string;

  //
  public turntomodels: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    public databaseService: AllHttpServicesService
  ) {

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (
        !paramMap.has(
          "selectedBrand" && "selectedModel" && "startyear" && "endyear"
        )
      ) {
        // redirect
        return;
      }
      this.selectedBrand = paramMap.get("selectedBrand");
      this.selectedModel = paramMap.get("selectedModel");
    });
  }

  ngOnInit() {

  }

  onChangeType(event) {
    this.turntomodels = !this.turntomodels;
  }

}
