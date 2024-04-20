import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class SpecializationsService {

  GetSpecializationsURL = environment.baseURL + 'specializations/getSpecializations';

  constructor(private http: HttpClient) { }

  getSpecializations() {
    return this.http.get<BaseResponseModel>(this.GetSpecializationsURL);
  }

}


