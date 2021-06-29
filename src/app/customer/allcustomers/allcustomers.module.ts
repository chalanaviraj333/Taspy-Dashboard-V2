import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllcustomersPageRoutingModule } from './allcustomers-routing.module';

import { AllcustomersPage } from './allcustomers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllcustomersPageRoutingModule
  ],
  declarations: [AllcustomersPage]
})
export class AllcustomersPageModule {}
