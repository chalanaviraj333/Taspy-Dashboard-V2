import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'allcustomers',
    loadChildren: () => import('./customer/allcustomers/allcustomers.module').then( m => m.AllcustomersPageModule)
  },
  {
    path: 'addcustomers',
    loadChildren: () => import('./customer/addcustomers/addcustomers.module').then( m => m.AddcustomersPageModule)
  },
  {
    path: 'editcustomer',
    loadChildren: () => import('./customer/editcustomer/editcustomer.module').then( m => m.EditcustomerPageModule)
  },
  {
    path: 'deletecustomer',
    loadChildren: () => import('./customer/deletecustomer/deletecustomer.module').then( m => m.DeletecustomerPageModule)
  },
  {
    path: 'exportcustomers',
    loadChildren: () => import('./customer/exportcustomers/exportcustomers.module').then( m => m.ExportcustomersPageModule)
  },
  {
    path: 'allremotes',
    loadChildren: () => import('./carremote/allremotes/allremotes.module').then( m => m.AllremotesPageModule)
  },
  {
    path: 'addremote',
    loadChildren: () => import('./carremote/addremote/addremote.module').then( m => m.AddremotePageModule)
  },
  {
    path: 'editremote',
    loadChildren: () => import('./carremote/editremote/editremote.module').then( m => m.EditremotePageModule)
  },
  {
    path: 'deleteremote',
    loadChildren: () => import('./carremote/deleteremote/deleteremote.module').then( m => m.DeleteremotePageModule)
  },
  {
    path: 'allremoteshells',
    loadChildren: () => import('./remoteshell/allremoteshells/allremoteshells.module').then( m => m.AllremoteshellsPageModule)
  },
  {
    path: 'addremoteshell',
    loadChildren: () => import('./remoteshell/addremoteshell/addremoteshell.module').then( m => m.AddremoteshellPageModule)
  },
  {
    path: 'editremoteshell',
    loadChildren: () => import('./remoteshell/editremoteshell/editremoteshell.module').then( m => m.EditremoteshellPageModule)
  },
  {
    path: 'deleteremoteshell',
    loadChildren: () => import('./remoteshell/deleteremoteshell/deleteremoteshell.module').then( m => m.DeleteremoteshellPageModule)
  },
  {
    path: 'allcarbrands',
    loadChildren: () => import('./carbrand/allcarbrands/allcarbrands.module').then( m => m.AllcarbrandsPageModule)
  },
  {
    path: 'addcarbrand',
    loadChildren: () => import('./carbrand/addcarbrand/addcarbrand.module').then( m => m.AddcarbrandPageModule)
  },
  {
    path: 'editcarbrand',
    loadChildren: () => import('./carbrand/editcarbrand/editcarbrand.module').then( m => m.EditcarbrandPageModule)
  },
  {
    path: 'deletecarbrand',
    loadChildren: () => import('./carbrand/deletecarbrand/deletecarbrand.module').then( m => m.DeletecarbrandPageModule)
  },
  {
    path: 'allcarmodels',
    loadChildren: () => import('./carmodel/allcarmodels/allcarmodels.module').then( m => m.AllcarmodelsPageModule)
  },
  {
    path: 'addcarmodel',
    loadChildren: () => import('./carmodel/addcarmodel/addcarmodel.module').then( m => m.AddcarmodelPageModule)
  },
  {
    path: 'editcarmodel',
    loadChildren: () => import('./carmodel/editcarmodel/editcarmodel.module').then( m => m.EditcarmodelPageModule)
  },
  {
    path: 'deletecarmodel',
    loadChildren: () => import('./carmodel/deletecarmodel/deletecarmodel.module').then( m => m.DeletecarmodelPageModule)
  },
  {
    path: 'carremote/remotedetailspage/:selectedRemote',
    loadChildren: () => import('./carremote/remotedetailspage/remotedetailspage.module').then( m => m.RemotedetailspagePageModule)
  },
  //   path: '',
  //   redirectTo: 'folder/Inbox',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
