import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotaddedkeyremotesPageRoutingModule } from './notaddedkeyremotes-routing.module';

import { NotaddedkeyremotesPage } from './notaddedkeyremotes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotaddedkeyremotesPageRoutingModule
  ],
  declarations: [NotaddedkeyremotesPage]
})
export class NotaddedkeyremotesPageModule {}
