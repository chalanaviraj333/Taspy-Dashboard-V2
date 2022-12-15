import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddKeydiyRemotePage } from './add-keydiy-remote.page';

const routes: Routes = [
  {
    path: '',
    component: AddKeydiyRemotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddKeydiyRemotePageRoutingModule {}
