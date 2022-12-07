import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllCarSubModelPageRoutingModule } from './all-car-sub-model-routing.module';

import { AllCarSubModelPage } from './all-car-sub-model.page';
import { CarSubModelComponent } from '../car-sub-model/car-sub-model.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllCarSubModelPageRoutingModule,
  ],
  declarations: [AllCarSubModelPage, CarSubModelComponent]
})
export class AllCarSubModelPageModule {}
