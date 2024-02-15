import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILoginUser } from '../interfaces/ilogin-user';
import { IResetPassword } from '../interfaces/iResetPassword';
import { BaseResponseModel } from '../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  LoginURL = environment.baseURL + 'Users/user-login';
  constructor(private http: HttpClient, private router: Router) { }

  login(loginModel: ILoginUser) {
    return this.http.post<BaseResponseModel>(this.LoginURL, loginModel);
    //  .subscribe(res => {
    //  console.log(res)
    //  this.setSession(res)
    //  this.router.navigate(["/main"])
    //});
  }
  //login(email: string, pass: string) {
  //  return this.http.post<ILoginUser>(`${environment.baseURL}Users/user-login`, { email, pass })
  //    .subscribe(res => {
  //      console.log(res)
  //      this.setSession(res)
  //      this.router.navigate(["/main"])
  //    });
  //}

  logOut() {
    localStorage.removeItem("id_token")
  }

  forgotPassword(email: string) {
    return this.http.post<BaseResponseModel>(`${environment.baseURL}Users/user-forget-password/${email}`,[]);
     
  }

  resetPassword(pss: string, cnfPss: string, confirmationCode: number, header: HttpHeaders): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(`${environment.baseURL}Users/user-reset-password`, { pss, cnfPss, confirmationCode }, { headers: header })
     
  }

  setSession(authRes: any) {
    console.log(authRes);
    localStorage.setItem("id_token", authRes.tkon)
  }

  public isLoggedIn() {
    return localStorage.getItem("id_token") === null ? false : true
  }
}
