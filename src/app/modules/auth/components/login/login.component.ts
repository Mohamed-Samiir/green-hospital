import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginUser } from 'src/app/core/interfaces/ilogin-user';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUserResponse } from '../../../../core/interfaces/users/iUser-response';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser: IUserResponse | undefined;
  user: ILoginUser = {
    email: "",
    password: ""
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
  }

  onSubmit = () => {
    this.authService.login(this.user).subscribe((res: BaseResponseModel) => {
      if (res.isSuccess) {
        this.currentUser = res.data as IUserResponse
        localStorage.setItem('User', JSON.stringify(this.currentUser));
        localStorage.setItem('id_token', JSON.stringify(this.currentUser.token));
        this.router.navigateByUrl('/main');
      } else {
        this.alertify.error(res.message)
      }
    })
  }

}
