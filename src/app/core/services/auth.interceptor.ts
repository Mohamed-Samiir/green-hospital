import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../interfaces/users/userModel';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  currentUser: UserModel;

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.currentUser = JSON.parse(localStorage.getItem("User")) as UserModel;
    if (this.currentUser) {
      request = request.clone({
        headers: request.headers.set("X-Auth-Token", this.currentUser.token),
      });
    }
    return next.handle(request);
  }
}
