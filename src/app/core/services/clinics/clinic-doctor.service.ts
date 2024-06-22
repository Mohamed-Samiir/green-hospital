import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { ClinicDoctor } from '../../interfaces/clinic-doctor';

@Injectable({
  providedIn: 'root'
})
export class ClinicDoctorService {

  AddClinicDoctorURL = environment.baseURL + 'clinicDoctors/addClinicDoctor';
  EditClinicDoctorURL = environment.baseURL + 'clinicDoctors/editClinicDoctor';
  DeleteClinicDoctorURL = environment.baseURL + 'clinicDoctors/deleteClinicDoctor';


  constructor(private http: HttpClient) { }

  addClinicDoctor(clinicDoctor: ClinicDoctor) {
    return this.http.post<BaseResponseModel>(this.AddClinicDoctorURL, clinicDoctor);
  }

  editClinicDoctor(doctorId: string, clinicDoctor: ClinicDoctor) {
    return this.http.post<BaseResponseModel>(`${this.EditClinicDoctorURL}/${doctorId}`, clinicDoctor);
  }

  deleteClinicDoctor(doctorId: string) {
    return this.http.delete<BaseResponseModel>(`${this.DeleteClinicDoctorURL}/${doctorId}`);
  }

}
