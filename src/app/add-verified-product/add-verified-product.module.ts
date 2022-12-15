import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddVerifiedProductPageRoutingModule } from './add-verified-product-routing.module';

import { AddVerifiedProductPage } from './add-verified-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddVerifiedProductPageRoutingModule
  ],
  declarations: [AddVerifiedProductPage]
})
export class AddVerifiedProductPageModule {}
