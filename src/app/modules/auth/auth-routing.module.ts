import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "",
        redirectTo: "login"
      },
      {
        path: "**",
        redirectTo: "login"
      }
    ]
  },
  {
    path: '',
    redirectTo: "login",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
