import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemoteshellfilterpagePage } from './remoteshellfilterpage.page';

const routes: Routes = [
  {
    path: '',
    component: RemoteshellfilterpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemoteshellfilterpagePageRoutingModule {}
