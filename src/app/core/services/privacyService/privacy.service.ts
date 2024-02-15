import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { IEditPrivacy } from '../../interfaces/Privacy/iedit-privacy';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class PrivacyService {
  getDriverPrivacyURL = environment.baseURL + 'Privacy/get-driver-privacy';
  getClientPRivacyURL = environment.baseURL + 'Privacy/get-client-privacy';
  editDriverPrivacyURL = environment.baseURL + 'Privacy/update-driver-privacy';
  editClientPrivacyURL = environment.baseURL + 'Privacy/update-client-privacy';
  constructor(private http: HttpClient, private router: Router) { }
  GetDriverPrivacy() {
    return this.http.get<BaseResponseModel>(this.getDriverPrivacyURL);

  }
  GetClientPRivacy() {
    return this.http.get<BaseResponseModel>(this.getClientPRivacyURL);

  }
  UpdateDriverPrivacy(Model: IEditPrivacy) {
    return this.http.post<BaseResponseModel>(this.editDriverPrivacyURL, Model);

  }
  UpdateClientPrivacy(Model: IEditPrivacy) {
    return this.http.post<BaseResponseModel>(this.editClientPrivacyURL, Model);

  }
}
