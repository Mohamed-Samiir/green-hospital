import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class DataGridDdlsService {

  constructor(private http: HttpClient) { }

  getDropdownData(url: string) {
    return this.http.get<BaseResponseModel>(`${environment.baseURL}${url}`);
  }
}
