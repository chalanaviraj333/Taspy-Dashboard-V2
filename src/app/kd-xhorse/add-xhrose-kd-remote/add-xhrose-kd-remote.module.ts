import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddXhroseKdRemotePageRoutingModule } from './add-xhrose-kd-remote-routing.module';

import { AddXhroseKdRemotePage } from './add-xhrose-kd-remote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddXhroseKdRemotePageRoutingModule
  ],
  declarations: [AddXhroseKdRemotePage]
})
export class AddXhroseKdRemotePageModule {}
