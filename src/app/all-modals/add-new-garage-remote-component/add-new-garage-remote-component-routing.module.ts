import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewGarageRemoteComponentPage } from './add-new-garage-remote-component.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewGarageRemoteComponentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewGarageRemoteComponentPageRoutingModule {}
