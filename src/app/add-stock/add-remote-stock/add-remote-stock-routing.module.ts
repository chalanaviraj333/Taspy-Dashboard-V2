import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRemoteStockPage } from './add-remote-stock.page';

const routes: Routes = [
  {
    path: '',
    component: AddRemoteStockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRemoteStockPageRoutingModule {}
