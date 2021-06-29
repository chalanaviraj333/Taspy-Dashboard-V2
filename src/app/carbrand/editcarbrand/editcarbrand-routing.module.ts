import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcarbrandPage } from './editcarbrand.page';

const routes: Routes = [
  {
    path: '',
    component: EditcarbrandPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditcarbrandPageRoutingModule {}
