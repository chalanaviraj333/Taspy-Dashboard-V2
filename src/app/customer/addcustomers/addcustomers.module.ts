import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcustomersPageRoutingModule } from './addcustomers-routing.module';

import { AddcustomersPage } from './addcustomers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcustomersPageRoutingModule
  ],
  declarations: [AddcustomersPage]
})
export class AddcustomersPageModule {}
