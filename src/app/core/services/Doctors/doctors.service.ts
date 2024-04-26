import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { AddDoctorModel } from '../../interfaces/doctor/add-doctor-model';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  GetDoctorsURL = environment.baseURL + 'doctors/getDoctors';
  AddDoctorURL = environment.baseURL + 'doctors/addDoctor';
  EditDoctorURL = environment.baseURL + 'doctors/editDoctor';
  DeleteDoctorURL = environment.baseURL + 'doctors/deleteDoctor';


  constructor(private http: HttpClient) { }

  getDoctors() {
    return this.http.get<BaseResponseModel>(this.GetDoctorsURL);
  }

  addDoctor(doctorObj: AddDoctorModel) {
    return this.http.post<BaseResponseModel>(this.AddDoctorURL, doctorObj);
  }

  editDoctor(doctorId: string, doctorObj: AddDoctorModel) {
    return this.http.post<BaseResponseModel>(`${this.EditDoctorURL}/${doctorId}`, doctorObj);
  }

  deleteDoctor(doctorId: string) {
    return this.http.delete<BaseResponseModel>(`${this.DeleteDoctorURL}/${doctorId}`);
  }

}
