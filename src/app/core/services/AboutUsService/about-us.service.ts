import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { IAboutUsEdit } from '../../interfaces/Aboutus/iabout-us-edit';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {
  getAboutUsURL = environment.baseURL + 'AboutUs/get-about-us';
  editAboutUsURL = environment.baseURL + 'AboutUs/update-about-us';
  constructor(private http: HttpClient, private router: Router) { }
  GetAboutUS() {
    return this.http.get<BaseResponseModel>(this.getAboutUsURL);
   
  }
  UpdateAboutUs(Model: IAboutUsEdit) {
    return this.http.post<BaseResponseModel>(this.editAboutUsURL, Model);
  
  }
}
