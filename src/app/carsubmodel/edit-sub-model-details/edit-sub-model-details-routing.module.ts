import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSubModelDetailsPage } from './edit-sub-model-details.page';

const routes: Routes = [
  {
    path: '',
    component: EditSubModelDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSubModelDetailsPageRoutingModule {}
