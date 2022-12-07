import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSubModelDetailsPageRoutingModule } from './edit-sub-model-details-routing.module';

import { EditSubModelDetailsPage } from './edit-sub-model-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSubModelDetailsPageRoutingModule
  ],
  declarations: [EditSubModelDetailsPage]
})
export class EditSubModelDetailsPageModule {}
