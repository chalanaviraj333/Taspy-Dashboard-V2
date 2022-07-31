import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCarSubModelPage } from './add-car-sub-model.page';

const routes: Routes = [
  {
    path: '',
    component: AddCarSubModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCarSubModelPageRoutingModule {}
