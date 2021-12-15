import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewGarageRemoteComponentPageRoutingModule } from './add-new-garage-remote-component-routing.module';

import { AddNewGarageRemoteComponentPage } from './add-new-garage-remote-component.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewGarageRemoteComponentPageRoutingModule
  ],
  declarations: [AddNewGarageRemoteComponentPage]
})
export class AddNewGarageRemoteComponentPageModule {}
