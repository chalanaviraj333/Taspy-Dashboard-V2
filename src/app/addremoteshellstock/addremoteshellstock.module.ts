import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddremoteshellstockPageRoutingModule } from './addremoteshellstock-routing.module';

import { AddremoteshellstockPage } from './addremoteshellstock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddremoteshellstockPageRoutingModule
  ],
  declarations: [AddremoteshellstockPage]
})
export class AddremoteshellstockPageModule {}
