import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemoteDetailModalPagePage } from './remote-detail-modal-page.page';

const routes: Routes = [
  {
    path: '',
    component: RemoteDetailModalPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemoteDetailModalPagePageRoutingModule {}
