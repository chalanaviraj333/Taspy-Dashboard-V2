import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllcarmodelsPageRoutingModule } from './allcarmodels-routing.module';

import { AllcarmodelsPage } from './allcarmodels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllcarmodelsPageRoutingModule
  ],
  declarations: [AllcarmodelsPage]
})
export class AllcarmodelsPageModule {}
