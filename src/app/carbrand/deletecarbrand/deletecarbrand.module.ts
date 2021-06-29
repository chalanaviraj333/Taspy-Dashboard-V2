import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeletecarbrandPageRoutingModule } from './deletecarbrand-routing.module';

import { DeletecarbrandPage } from './deletecarbrand.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeletecarbrandPageRoutingModule
  ],
  declarations: [DeletecarbrandPage]
})
export class DeletecarbrandPageModule {}
