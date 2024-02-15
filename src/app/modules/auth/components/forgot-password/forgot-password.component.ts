import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IForgotPassword } from 'src/app/core/interfaces/iForgotPassword';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUserResponse } from '../../../../core/interfaces/users/iUser-response';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  currentUser: IUserResponse | undefined;

  user: IForgotPassword = {
    email: "",
  }

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit = () => {
    this.auth.forgotPassword(this.user.email).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          console.log(res.data)
          localStorage.setItem('token', JSON.stringify(res.data));
          this.router.navigateByUrl('/auth/resetpassword');

        }
        else
          console.log(res);
      })
  }
}
