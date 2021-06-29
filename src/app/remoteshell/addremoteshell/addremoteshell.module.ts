import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddremoteshellPageRoutingModule } from './addremoteshell-routing.module';

import { AddremoteshellPage } from './addremoteshell.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddremoteshellPageRoutingModule
  ],
  declarations: [AddremoteshellPage]
})
export class AddremoteshellPageModule {}
