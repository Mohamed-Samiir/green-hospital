import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IResetPassword } from 'src/app/core/interfaces/iResetPassword';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  user: IResetPassword = {
    pss: "",
    cnfPss: "",
    confirmationCode:0
  }

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit = () => {
    console.log(this.user);
    let headers: HttpHeaders = new HttpHeaders();
    var token = localStorage.getItem("token")
    console.log(token?.toString());
    if (token === null)
      this.router.navigateByUrl('/auth/resetpassword');
    headers = new HttpHeaders().set("Authorization", 'Bearer ' + token);
    this.auth.resetPassword(this.user.pss, this.user.cnfPss, this.user.confirmationCode, headers).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          localStorage.removeItem('token');
          this.router.navigateByUrl('/auth/login');

        }
        else {

        }
         
      })
  }
  
}
