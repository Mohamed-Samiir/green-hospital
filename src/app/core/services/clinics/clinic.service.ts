import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { Clinic } from '../../interfaces/clinic';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  // GetDoctorsURL = environment.baseURL + 'doctors/getDoctors';
  AddClinicURL = environment.baseURL + 'clinics/addClinic';
  EditClinicURL = environment.baseURL + 'clinics/editClinic';
  DeleteClinicURL = environment.baseURL + 'clinics/deleteClinic';


  constructor(private http: HttpClient) { }

  addClinic(clinic: Clinic) {
    return this.http.post<BaseResponseModel>(this.AddClinicURL, clinic);
  }

  editClinic(clinicId: string, clinic: Clinic) {
    return this.http.post<BaseResponseModel>(`${this.EditClinicURL}/${clinicId}`, clinic);
  }

  deleteClinic(clinicId: string) {
    return this.http.delete<BaseResponseModel>(`${this.DeleteClinicURL}/${clinicId}`);
  }
}
