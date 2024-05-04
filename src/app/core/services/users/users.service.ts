import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../interfaces/users/userModel';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  GetUsersURL = environment.baseURL + 'users/getUsers';
  AddUsersURL = environment.baseURL + 'users/addUser';
  EditUsersURL = environment.baseURL + 'users/editUser';
  DeleteUsersURL = environment.baseURL + 'users/deleteUser';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<BaseResponseModel>(this.GetUsersURL);
  }

  addUser(user: UserModel) {
    return this.http.post<BaseResponseModel>(this.AddUsersURL, user);
  }

  editUser(user: UserModel) {
    return this.http.post<BaseResponseModel>(this.EditUsersURL, user);
  }

  deleteUser(userId: string) {
    return this.http.delete<BaseResponseModel>(`${this.DeleteUsersURL}/${userId}`);
  }

}

