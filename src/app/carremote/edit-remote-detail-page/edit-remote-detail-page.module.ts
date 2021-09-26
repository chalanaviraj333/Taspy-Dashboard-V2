import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRemoteDetailPagePageRoutingModule } from './edit-remote-detail-page-routing.module';

import { EditRemoteDetailPagePage } from './edit-remote-detail-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRemoteDetailPagePageRoutingModule
  ],
  declarations: [EditRemoteDetailPagePage]
})
export class EditRemoteDetailPagePageModule {}
