import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendReceiptPageRoutingModule } from './send-receipt-routing.module';

import { SendReceiptPage } from './send-receipt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendReceiptPageRoutingModule
  ],
  declarations: [SendReceiptPage]
})
export class SendReceiptPageModule {}
