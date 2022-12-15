import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarSubModelInfoPageRoutingModule } from './car-sub-model-info-routing.module';

import { CarSubModelInfoPage } from './car-sub-model-info.page';
import { ProductCardRemoteComponent } from '../product-card-remote/product-card-remote.component';
import { ProductCardKeydiyComponent } from '../product-card-keydiy/product-card-keydiy.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarSubModelInfoPageRoutingModule
  ],
  declarations: [CarSubModelInfoPage, ProductCardRemoteComponent, ProductCardKeydiyComponent]
})
export class CarSubModelInfoPageModule {}
