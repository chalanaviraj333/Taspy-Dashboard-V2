import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddVerifiedProductPage } from './add-verified-product.page';

const routes: Routes = [
  {
    path: '',
    component: AddVerifiedProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddVerifiedProductPageRoutingModule {}
