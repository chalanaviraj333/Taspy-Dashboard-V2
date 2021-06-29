import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemotedetailspagePage } from './remotedetailspage.page';

const routes: Routes = [
  {
    path: '',
    component: RemotedetailspagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemotedetailspagePageRoutingModule {}
