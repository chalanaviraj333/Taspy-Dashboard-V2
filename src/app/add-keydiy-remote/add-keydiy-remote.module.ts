import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddKeydiyRemotePageRoutingModule } from './add-keydiy-remote-routing.module';

import { AddKeydiyRemotePage } from './add-keydiy-remote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddKeydiyRemotePageRoutingModule
  ],
  declarations: [AddKeydiyRemotePage]
})
export class AddKeydiyRemotePageModule {}
