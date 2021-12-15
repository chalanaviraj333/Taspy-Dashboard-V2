import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddremoteshellstockPage } from './addremoteshellstock.page';

const routes: Routes = [
  {
    path: '',
    component: AddremoteshellstockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddremoteshellstockPageRoutingModule {}
