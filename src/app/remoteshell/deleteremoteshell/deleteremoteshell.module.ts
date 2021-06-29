import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteremoteshellPageRoutingModule } from './deleteremoteshell-routing.module';

import { DeleteremoteshellPage } from './deleteremoteshell.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteremoteshellPageRoutingModule
  ],
  declarations: [DeleteremoteshellPage]
})
export class DeleteremoteshellPageModule {}
