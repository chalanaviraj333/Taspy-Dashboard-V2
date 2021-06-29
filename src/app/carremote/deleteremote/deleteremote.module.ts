import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteremotePageRoutingModule } from './deleteremote-routing.module';

import { DeleteremotePage } from './deleteremote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteremotePageRoutingModule
  ],
  declarations: [DeleteremotePage]
})
export class DeleteremotePageModule {}
