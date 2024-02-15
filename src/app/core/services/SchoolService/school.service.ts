import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { PaginationTable } from '../../ng-model/PaginationModels/pagination-table';

@Injectable({
  providedIn: 'root'
})
  //add all other requests 
export class SchoolService {
  getSchoolsURL = environment.baseURL + 'School/school-list-paginated';
  
  constructor(private http: HttpClient, private router: Router) { }
  GetAboutUS(model: PaginationTable) {
    return this.http.post<BaseResponseModel>(this.getSchoolsURL, model);

  }
 
}
