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
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: 'doctors',
    component: MainComponent,
    children: [
      {
        path: "",
        // canActivate: [AuthenticationGuard],
        loadChildren: () => import('../doctors/doctors.module').then(m => m.DoctorsModule)
      }
    ]
  },
  {
    path: 'specializations',
    component: MainComponent,
    children: [
      {
        path: "",
        // canActivate: [AuthenticationGuard],
        loadChildren: () => import('../specializations/specializations.module').then(m => m.SpecializationsModule)
      }
    ]
  },
  {
    path: 'users',
    component: MainComponent,
    children: [
      {
        path: "",
        // canActivate: [AuthenticationGuard],
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
