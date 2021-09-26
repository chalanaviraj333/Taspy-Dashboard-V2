import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotaddedkeyremotesPage } from './notaddedkeyremotes.page';

const routes: Routes = [
  {
    path: '',
    component: NotaddedkeyremotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotaddedkeyremotesPageRoutingModule {}
