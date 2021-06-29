import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeletecarmodelPage } from './deletecarmodel.page';

const routes: Routes = [
  {
    path: '',
    component: DeletecarmodelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeletecarmodelPageRoutingModule {}
