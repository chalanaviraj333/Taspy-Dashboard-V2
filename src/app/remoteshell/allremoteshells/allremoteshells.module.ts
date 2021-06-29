import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllremoteshellsPageRoutingModule } from './allremoteshells-routing.module';

import { AllremoteshellsPage } from './allremoteshells.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllremoteshellsPageRoutingModule
  ],
  declarations: [AllremoteshellsPage]
})
export class AllremoteshellsPageModule {}
