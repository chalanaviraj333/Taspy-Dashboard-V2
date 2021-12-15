import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddXhroseKdRemotePage } from './add-xhrose-kd-remote.page';

const routes: Routes = [
  {
    path: '',
    component: AddXhroseKdRemotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddXhroseKdRemotePageRoutingModule {}
