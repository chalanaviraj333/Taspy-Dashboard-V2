import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteremoteshellPage } from './deleteremoteshell.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteremoteshellPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteremoteshellPageRoutingModule {}
