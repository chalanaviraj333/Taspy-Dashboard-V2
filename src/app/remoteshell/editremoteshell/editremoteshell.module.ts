import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditremoteshellPageRoutingModule } from './editremoteshell-routing.module';

import { EditremoteshellPage } from './editremoteshell.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditremoteshellPageRoutingModule
  ],
  declarations: [EditremoteshellPage]
})
export class EditremoteshellPageModule {}
