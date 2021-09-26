import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddnewcomponentPageRoutingModule } from './addnewcomponent-routing.module';

import { AddnewcomponentPage } from './addnewcomponent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddnewcomponentPageRoutingModule
  ],
  declarations: [AddnewcomponentPage]
})
export class AddnewcomponentPageModule {}
