import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateNewSystemPage } from './generate-new-system.page';

const routes: Routes = [
  {
    path: '',
    component: GenerateNewSystemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateNewSystemPageRoutingModule {}
