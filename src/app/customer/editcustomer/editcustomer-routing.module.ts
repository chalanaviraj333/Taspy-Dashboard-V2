import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcustomerPage } from './editcustomer.page';

const routes: Routes = [
  {
    path: '',
    component: EditcustomerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditcustomerPageRoutingModule {}
