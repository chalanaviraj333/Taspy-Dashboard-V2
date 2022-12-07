import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllCarSubModelPage } from './all-car-sub-model.page';

const routes: Routes = [
  {
    path: '',
    component: AllCarSubModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllCarSubModelPageRoutingModule {}
