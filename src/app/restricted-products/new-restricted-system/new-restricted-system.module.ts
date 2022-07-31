import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewRestrictedSystemPageRoutingModule } from './new-restricted-system-routing.module';

import { NewRestrictedSystemPage } from './new-restricted-system.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewRestrictedSystemPageRoutingModule
  ],
  declarations: [NewRestrictedSystemPage]
})
export class NewRestrictedSystemPageModule {}
