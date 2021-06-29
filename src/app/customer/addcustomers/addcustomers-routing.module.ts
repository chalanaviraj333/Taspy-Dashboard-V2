import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcustomersPage } from './addcustomers.page';

const routes: Routes = [
  {
    path: '',
    component: AddcustomersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcustomersPageRoutingModule {}
