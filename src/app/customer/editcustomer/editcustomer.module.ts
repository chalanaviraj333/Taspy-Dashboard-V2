import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcustomerPageRoutingModule } from './editcustomer-routing.module';

import { EditcustomerPage } from './editcustomer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditcustomerPageRoutingModule
  ],
  declarations: [EditcustomerPage]
})
export class EditcustomerPageModule {}
