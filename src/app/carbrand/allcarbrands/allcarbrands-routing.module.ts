import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllcarbrandsPage } from './allcarbrands.page';

const routes: Routes = [
  {
    path: '',
    component: AllcarbrandsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllcarbrandsPageRoutingModule {}
