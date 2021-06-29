import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcarbrandPageRoutingModule } from './editcarbrand-routing.module';

import { EditcarbrandPage } from './editcarbrand.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditcarbrandPageRoutingModule
  ],
  declarations: [EditcarbrandPage]
})
export class EditcarbrandPageModule {}
