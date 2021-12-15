import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewGarageRemotePageRoutingModule } from './add-new-garage-remote-routing.module';

import { AddNewGarageRemotePage } from './add-new-garage-remote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewGarageRemotePageRoutingModule
  ],
  declarations: [AddNewGarageRemotePage]
})
export class AddNewGarageRemotePageModule {}
