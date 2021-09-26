import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemoteshellfilterpagePageRoutingModule } from './remoteshellfilterpage-routing.module';

import { RemoteshellfilterpagePage } from './remoteshellfilterpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemoteshellfilterpagePageRoutingModule
  ],
  declarations: [RemoteshellfilterpagePage]
})
export class RemoteshellfilterpagePageModule {}
