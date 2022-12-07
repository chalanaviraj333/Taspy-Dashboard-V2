import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllCarBrandsPageRoutingModule } from './all-car-brands-routing.module';

import { AllCarBrandsPage } from './all-car-brands.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllCarBrandsPageRoutingModule
  ],
  declarations: [AllCarBrandsPage]
})
export class AllCarBrandsPageModule {}
