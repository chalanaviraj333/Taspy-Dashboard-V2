import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarSubModelInfoPage } from './car-sub-model-info.page';

const routes: Routes = [
  {
    path: '',
    component: CarSubModelInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarSubModelInfoPageRoutingModule {}
