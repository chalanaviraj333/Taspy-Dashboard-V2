import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewRestrictedSystemPage } from './new-restricted-system.page';

const routes: Routes = [
  {
    path: '',
    component: NewRestrictedSystemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewRestrictedSystemPageRoutingModule {}
