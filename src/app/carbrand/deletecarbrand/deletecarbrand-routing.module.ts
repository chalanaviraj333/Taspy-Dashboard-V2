import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeletecarbrandPage } from './deletecarbrand.page';

const routes: Routes = [
  {
    path: '',
    component: DeletecarbrandPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeletecarbrandPageRoutingModule {}
