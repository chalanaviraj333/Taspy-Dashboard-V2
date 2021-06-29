import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcarmodelPage } from './addcarmodel.page';

const routes: Routes = [
  {
    path: '',
    component: AddcarmodelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcarmodelPageRoutingModule {}
