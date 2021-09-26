import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemoteDetailModalPagePageRoutingModule } from './remote-detail-modal-page-routing.module';

import { RemoteDetailModalPagePage } from './remote-detail-modal-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemoteDetailModalPagePageRoutingModule
  ],
  declarations: [RemoteDetailModalPagePage]
})
export class RemoteDetailModalPagePageModule {}
