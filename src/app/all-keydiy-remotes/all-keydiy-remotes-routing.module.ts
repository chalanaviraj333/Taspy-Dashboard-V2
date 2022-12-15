import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllKeydiyRemotesPage } from './all-keydiy-remotes.page';

const routes: Routes = [
  {
    path: '',
    component: AllKeydiyRemotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllKeydiyRemotesPageRoutingModule {}
