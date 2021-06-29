import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllremotesPageRoutingModule } from './allremotes-routing.module';

import { AllremotesPage } from './allremotes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllremotesPageRoutingModule
  ],
  declarations: [AllremotesPage]
})
export class AllremotesPageModule {}
