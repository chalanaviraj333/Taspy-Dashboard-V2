import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllremotesPage } from './allremotes.page';

const routes: Routes = [
  {
    path: '',
    component: AllremotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllremotesPageRoutingModule {}
