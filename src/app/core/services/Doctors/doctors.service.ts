import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { IReassignGroupToDriverModel } from '../../interfaces/trips/iReassign-group-to-driver-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  GetDoctorsURL = environment.baseURL + 'doctors/getDoctors';


  constructor(private http: HttpClient) { }

  getDoctors() {
    return this.http.get<BaseResponseModel>(this.GetDoctorsURL);
  }

}
