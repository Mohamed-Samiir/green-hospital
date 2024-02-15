import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { ISchool } from '../../interfaces/schools/i-school';
import { ISchoolFilterRequest } from '../../interfaces/schools/ischool-filter-request';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  private SchoolListURL = environment.baseURL + 'School/school-list-paginated';
  private AddSchoolURL = environment.baseURL + 'School/add-school'
  private EditSchoolURL = environment.baseURL + 'School/edit-school'
  private DeleteSchoolURL = environment.baseURL + 'School/delete-school/'
  private GetSchoolByIdURL = environment.baseURL + 'School/get-school-details/'

  constructor(private http: HttpClient, private router: Router) { }

  GetSchoolsListPaginated(model: ISchoolFilterRequest) {
    return this.http.post<BaseResponseModel>(this.SchoolListURL, model);
  }

  AddSchool(model: ISchool) {
    return this.http.post<BaseResponseModel>(this.AddSchoolURL, model);
  }

  EditSchool(model: ISchool) {
    return this.http.post<BaseResponseModel>(this.EditSchoolURL, model);
  }

  DeleteSchool(id: string) {
    return this.http.delete<BaseResponseModel>(this.DeleteSchoolURL + id);
  }

  GetSchoolById(id: string) {
    return this.http.get<BaseResponseModel>(this.GetSchoolByIdURL + id)
  }
}
