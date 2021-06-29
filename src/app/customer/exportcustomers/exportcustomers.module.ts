import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportcustomersPageRoutingModule } from './exportcustomers-routing.module';

import { ExportcustomersPage } from './exportcustomers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExportcustomersPageRoutingModule
  ],
  declarations: [ExportcustomersPage]
})
export class ExportcustomersPageModule {}
