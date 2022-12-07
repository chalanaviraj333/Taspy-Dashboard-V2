import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllCarBrandsPage } from './all-car-brands.page';

const routes: Routes = [
  {
    path: '',
    component: AllCarBrandsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllCarBrandsPageRoutingModule {}
