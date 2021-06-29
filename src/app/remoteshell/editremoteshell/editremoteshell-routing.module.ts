import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditremoteshellPage } from './editremoteshell.page';

const routes: Routes = [
  {
    path: '',
    component: EditremoteshellPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditremoteshellPageRoutingModule {}
