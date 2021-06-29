import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExportcustomersPage } from './exportcustomers.page';

const routes: Routes = [
  {
    path: '',
    component: ExportcustomersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportcustomersPageRoutingModule {}
