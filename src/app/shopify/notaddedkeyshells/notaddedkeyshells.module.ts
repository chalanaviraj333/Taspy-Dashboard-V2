import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotaddedkeyshellsPageRoutingModule } from './notaddedkeyshells-routing.module';

import { NotaddedkeyshellsPage } from './notaddedkeyshells.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotaddedkeyshellsPageRoutingModule
  ],
  declarations: [NotaddedkeyshellsPage]
})
export class NotaddedkeyshellsPageModule {}
