import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRemoteDetailPagePage } from './edit-remote-detail-page.page';

const routes: Routes = [
  {
    path: '',
    component: EditRemoteDetailPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRemoteDetailPagePageRoutingModule {}
