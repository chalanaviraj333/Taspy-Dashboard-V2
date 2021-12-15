import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRemoteStockPageRoutingModule } from './add-remote-stock-routing.module';

import { AddRemoteStockPage } from './add-remote-stock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRemoteStockPageRoutingModule
  ],
  declarations: [AddRemoteStockPage]
})
export class AddRemoteStockPageModule {}
