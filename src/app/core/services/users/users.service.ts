import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  GetUsersURL = environment.baseURL + 'users/getUsers';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<BaseResponseModel>(this.GetUsersURL);
  }

}

