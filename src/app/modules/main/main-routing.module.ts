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
        canActivate: [AuthenticationGuard],
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
        canActivate: [AuthenticationGuard],
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
        canActivate: [AuthenticationGuard],
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
        canActivate: [AuthenticationGuard],
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule)
      }
    ]
  },
  {
    path: 'branches',
    component: MainComponent,
    children: [
      {
        path: "",
        canActivate: [AuthenticationGuard],
        loadChildren: () => import('../branches/branches.module').then(m => m.BranchesModule)
      }
    ]
  },
  {
    path: 'clinics',
    component: MainComponent,
    children: [
      {
        path: "",
        canActivate: [AuthenticationGuard],
        loadChildren: () => import('../clinics/clinics.module').then(m => m.ClinicsModule)
      }
    ]
  },
  {
    path: 'departments',
    component: MainComponent,
    children: [
      {
        path: "",
        canActivate: [AuthenticationGuard],
        loadChildren: () => import('../departments/departments.module').then(m => m.DepartmentsModule)
      }
    ]
  },
  {
    path: 'procedures',
    component: MainComponent,
    children: [
      {
        path: "",
        canActivate: [AuthenticationGuard],
        loadChildren: () => import('../procedures/procedures.module').then(m => m.ProceduresModule)
      }
    ]
  },
  {
    path: 'questions',
    component: MainComponent,
    children: [
      {
        path: "",
        canActivate: [AuthenticationGuard],
        loadChildren: () => import('../questions/questions.module').then(m => m.QuestionsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
