import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddremoteshellPage } from './addremoteshell.page';

const routes: Routes = [
  {
    path: '',
    component: AddremoteshellPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddremoteshellPageRoutingModule {}
