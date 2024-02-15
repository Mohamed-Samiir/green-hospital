import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: "resetpassword",
        component: ResetPasswordComponent
      },
      {
        path: "forgotpassword",
        component: ForgotPasswordComponent
      },
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
