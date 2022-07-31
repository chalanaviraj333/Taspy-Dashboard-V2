import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateNewSystemPageRoutingModule } from './generate-new-system-routing.module';

import { GenerateNewSystemPage } from './generate-new-system.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateNewSystemPageRoutingModule
  ],
  declarations: [GenerateNewSystemPage]
})
export class GenerateNewSystemPageModule {}
