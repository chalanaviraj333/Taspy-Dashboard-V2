import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllremoteshellsPage } from './allremoteshells.page';

const routes: Routes = [
  {
    path: '',
    component: AllremoteshellsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllremoteshellsPageRoutingModule {}
