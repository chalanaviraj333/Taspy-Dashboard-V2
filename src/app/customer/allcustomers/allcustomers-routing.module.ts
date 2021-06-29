import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllcustomersPage } from './allcustomers.page';

const routes: Routes = [
  {
    path: '',
    component: AllcustomersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllcustomersPageRoutingModule {}
