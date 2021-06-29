import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcarmodelPageRoutingModule } from './addcarmodel-routing.module';

import { AddcarmodelPage } from './addcarmodel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcarmodelPageRoutingModule
  ],
  declarations: [AddcarmodelPage]
})
export class AddcarmodelPageModule {}
