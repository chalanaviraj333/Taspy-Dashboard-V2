import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteremotePage } from './deleteremote.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteremotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteremotePageRoutingModule {}
