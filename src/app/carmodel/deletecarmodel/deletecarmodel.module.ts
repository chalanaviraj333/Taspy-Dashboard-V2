import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeletecarmodelPageRoutingModule } from './deletecarmodel-routing.module';

import { DeletecarmodelPage } from './deletecarmodel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeletecarmodelPageRoutingModule
  ],
  declarations: [DeletecarmodelPage]
})
export class DeletecarmodelPageModule {}
