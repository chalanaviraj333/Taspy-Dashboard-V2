import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCarSubModelPageRoutingModule } from './add-car-sub-model-routing.module';

import { AddCarSubModelPage } from './add-car-sub-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCarSubModelPageRoutingModule
  ],
  declarations: [AddCarSubModelPage]
})
export class AddCarSubModelPageModule {}
