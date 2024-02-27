import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/services/guards/authentication.guard';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainComponent,
    children: [
      {
        path: "",
        // canActivate: [AuthenticationGuard],
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  {
    path: 'passangers',
    component: MainComponent,
    children: [
      {
        path: "",
        // canActivate: [AuthenticationGuard],
        loadChildren: () => import('../passangers/passangers.module').then(m => m.PassangersModule)
      }
    ]
  },
  {
    path: 'drivers',
    component: MainComponent,
    children: [
      {
        path: "",
        // canActivate: [AuthenticationGuard],
        loadChildren: () => import('../drivers/drivers.module').then(m => m.DriversModule)
      }
    ]
  },
  {
    path: 'schools',
    component: MainComponent,
    children: [
      {
        path: "",
        // canActivate: [AuthenticationGuard],
        loadChildren: () => import('../schools/schools.module').then(m => m.SchoolsModule)
      }
    ]
  },
  {
    path: 'trips/recursive',
    component: MainComponent,
    children: [
      {
        path: "",
        // canActivate: [AuthenticationGuard],
        loadChildren: () => import('../trips/trips.module').then(m => m.TripsModule)
      }
    ]
  },
  {
    path: 'cms',
    component: MainComponent,
    children: [
      {
        path: "",
        // canActivate: [AuthenticationGuard],
        loadChildren: () => import('../cms-pages/cms-pages.module').then(m => m.CmsPagesModule)
      }
    ]
  },
  {
    path: 'messages',
    component: MainComponent,
    children: [
      {
        path: "",
        // canActivate: [AuthenticationGuard],
        loadChildren: () => import('../messages/messages.module').then(m => m.MessagesModule)
      }
    ]
  },
  //{
  //  path: 'promotions',
  //  component: MainComponent,
  //  children: [
  //    {
  //      path: "",
  //      canActivate: [AuthenticationGuard],
  //      loadChildren: () => import('../promotions/promotions.module').then(m => m.PromotionsModule)
  //    }
  //  ]
  //},
  {
    path: 'wallet',
    component: MainComponent,
    children: [
      {
        path: "",
        // canActivate: [AuthenticationGuard],
        loadChildren: () => import('../wallet/wallet.module').then(m => m.WalletModule)
      }
    ]
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  { path: 'modules/drivers', loadChildren: () => import('../drivers/drivers.module').then(m => m.DriversModule) }
  ,
  {
    path: 'Renew',
    component: MainComponent,
    children: [
      {
        path: "",
        // canActivate: [AuthenticationGuard],
        loadChildren: () => import('../Renew/renew.module').then(m => m.RenewModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
