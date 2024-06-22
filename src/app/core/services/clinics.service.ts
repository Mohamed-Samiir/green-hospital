import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../ng-model/base-response-model';
import { Clinic } from '../interfaces/clinic';

@Injectable({
  providedIn: 'root'
})
export class ClinicsService {
  GetClinicsURL = environment.baseURL + 'clinics/getClinics';
  AddClinicURL = environment.baseURL + 'clinics/addClinic';
  EditClinicURL = environment.baseURL + 'clinics/editClinic';
  DeleteClinicURL = environment.baseURL + 'clinics/deleteClinic';


  constructor(private http: HttpClient) { }

  getClinics() {
    return this.http.get<BaseResponseModel>(this.GetClinicsURL);
  }

  addClinic(clinicObj: Clinic) {
    return this.http.post<BaseResponseModel>(this.AddClinicURL, clinicObj);
  }

  editClinic(clinicId: string, clinicObj: Clinic) {
    return this.http.post<BaseResponseModel>(`${this.EditClinicURL}/${clinicId}`, clinicObj);
  }

  deleteClinic(clinicId: string) {
    return this.http.delete<BaseResponseModel>(`${this.DeleteClinicURL}/${clinicId}`);
  }
}
