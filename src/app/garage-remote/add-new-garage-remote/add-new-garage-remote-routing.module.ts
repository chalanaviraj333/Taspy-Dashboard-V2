import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewGarageRemotePage } from './add-new-garage-remote.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewGarageRemotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewGarageRemotePageRoutingModule {}
