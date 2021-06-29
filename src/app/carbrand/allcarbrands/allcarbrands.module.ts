import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllcarbrandsPageRoutingModule } from './allcarbrands-routing.module';

import { AllcarbrandsPage } from './allcarbrands.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllcarbrandsPageRoutingModule
  ],
  declarations: [AllcarbrandsPage]
})
export class AllcarbrandsPageModule {}
