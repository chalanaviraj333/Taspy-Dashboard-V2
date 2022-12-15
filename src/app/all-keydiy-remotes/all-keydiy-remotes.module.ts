import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllKeydiyRemotesPageRoutingModule } from './all-keydiy-remotes-routing.module';

import { AllKeydiyRemotesPage } from './all-keydiy-remotes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllKeydiyRemotesPageRoutingModule
  ],
  declarations: [AllKeydiyRemotesPage]
})
export class AllKeydiyRemotesPageModule {}
