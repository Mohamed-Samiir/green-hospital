import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { Specialization } from '../../interfaces/specialization';

@Injectable({
  providedIn: 'root'
})
export class SpecializationsService {

  GetSpecializationsURL = environment.baseURL + 'specializations/getSpecializations';
  GetSubSpecializationsURL = environment.baseURL + 'specializations/getSubSpecializations';
  AddSpecializationURL = environment.baseURL + 'specializations/addSpecialization';
  EditSpecializationURL = environment.baseURL + 'specializations/editSpecialization';
  DeleteSpecializationURL = environment.baseURL + 'specializations/deleteSpecialization';

  constructor(private http: HttpClient) { }

  getSpecializations() {
    return this.http.get<BaseResponseModel>(this.GetSpecializationsURL);
  }

  getSubSpecializations() {
    return this.http.get<BaseResponseModel>(this.GetSubSpecializationsURL);
  }

  addSpecialization(model: Specialization) {
    return this.http.post<BaseResponseModel>(this.AddSpecializationURL, model)
  }

  editSpecialization(id: string, model: Specialization) {
    return this.http.post<BaseResponseModel>(`${this.EditSpecializationURL}/${id}`, model)
  }

  deleteSpecialization(id: string) {
    return this.http.delete<BaseResponseModel>(`${this.DeleteSpecializationURL}/${id}`)
  }

}


