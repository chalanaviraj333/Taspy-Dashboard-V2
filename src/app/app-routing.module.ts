import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
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
    path: 'editremoteshell/:tapsycode',
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
    path: 'notaddedkeyshells',
    loadChildren: () => import('./shopify/notaddedkeyshells/notaddedkeyshells.module').then( m => m.NotaddedkeyshellsPageModule)
  },
  {
    path: 'notaddedkeyremotes',
    loadChildren: () => import('./shopify/notaddedkeyremotes/notaddedkeyremotes.module').then( m => m.NotaddedkeyremotesPageModule)
  },
  {
    path: 'remoteshellfilterpage',
    loadChildren: () => import('./allmodels/remoteshellfilterpage/remoteshellfilterpage.module').then( m => m.RemoteshellfilterpagePageModule)
  },
  {
    path: 'send-receipt',
    loadChildren: () => import('./send-receipt/send-receipt.module').then( m => m.SendReceiptPageModule)
  },
  {
    path: 'remote-detail-modal-page',
    loadChildren: () => import('./carremote/remote-detail-modal-page/remote-detail-modal-page.module').then( m => m.RemoteDetailModalPagePageModule)
  },
  {
    path: 'edit-remote-detail-page/:tapsycode',
    loadChildren: () => import('./carremote/edit-remote-detail-page/edit-remote-detail-page.module').then( m => m.EditRemoteDetailPagePageModule)
  },
  {
    path: 'addnewcomponent',
    loadChildren: () => import('./modalcontrollers/addnewcomponent/addnewcomponent.module').then( m => m.AddnewcomponentPageModule)
  },
  {
    path: 'add-xhrose-kd-remote',
    loadChildren: () => import('./kd-xhorse/add-xhrose-kd-remote/add-xhrose-kd-remote.module').then( m => m.AddXhroseKdRemotePageModule)
  },
  {
    path: 'add-new-garage-remote',
    loadChildren: () => import('./garage-remote/add-new-garage-remote/add-new-garage-remote.module').then( m => m.AddNewGarageRemotePageModule)
  },
  {
    path: 'add-new-garage-remote-component',
    loadChildren: () => import('./all-modals/add-new-garage-remote-component/add-new-garage-remote-component.module').then( m => m.AddNewGarageRemoteComponentPageModule)
  },
  {
    path: 'add-remote-stock',
    loadChildren: () => import('./add-stock/add-remote-stock/add-remote-stock.module').then( m => m.AddRemoteStockPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./all-modals/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'addremoteshellstock',
    loadChildren: () => import('./addremoteshellstock/addremoteshellstock.module').then( m => m.AddremoteshellstockPageModule)
  },  {
    path: 'all-garage-remotes',
    loadChildren: () => import('./garage-remote/all-garage-remotes/all-garage-remotes.module').then( m => m.AllGarageRemotesPageModule)
  },
  {
    path: 'new-restricted-system',
    loadChildren: () => import('./restricted-products/new-restricted-system/new-restricted-system.module').then( m => m.NewRestrictedSystemPageModule)
  },
  {
    path: 'generate-new-system',
    loadChildren: () => import('./restricted-products/generate-new-system/generate-new-system.module').then( m => m.GenerateNewSystemPageModule)
  },
  {
    path: 'add-car-sub-model',
    loadChildren: () => import('./carsubmodel/add-car-sub-model/add-car-sub-model/add-car-sub-model.module').then( m => m.AddCarSubModelPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
