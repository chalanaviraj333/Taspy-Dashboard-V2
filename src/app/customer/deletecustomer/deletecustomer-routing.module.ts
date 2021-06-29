import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeletecustomerPage } from './deletecustomer.page';

const routes: Routes = [
  {
    path: '',
    component: DeletecustomerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeletecustomerPageRoutingModule {}
