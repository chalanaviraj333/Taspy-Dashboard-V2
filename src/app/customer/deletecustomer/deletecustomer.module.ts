import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeletecustomerPageRoutingModule } from './deletecustomer-routing.module';

import { DeletecustomerPage } from './deletecustomer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeletecustomerPageRoutingModule
  ],
  declarations: [DeletecustomerPage]
})
export class DeletecustomerPageModule {}
