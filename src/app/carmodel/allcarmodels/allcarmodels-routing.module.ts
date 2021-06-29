import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllcarmodelsPage } from './allcarmodels.page';

const routes: Routes = [
  {
    path: '',
    component: AllcarmodelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllcarmodelsPageRoutingModule {}
