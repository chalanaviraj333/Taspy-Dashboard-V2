import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemotedetailspagePageRoutingModule } from './remotedetailspage-routing.module';

import { RemotedetailspagePage } from './remotedetailspage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemotedetailspagePageRoutingModule
  ],
  declarations: [RemotedetailspagePage]
})
export class RemotedetailspagePageModule {}
