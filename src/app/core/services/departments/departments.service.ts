import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { Department } from '../../interfaces/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  GetDepartmentsURL = environment.baseURL + 'departments/getDepartments';
  AddDepartmentURL = environment.baseURL + 'departments/addDepartment';
  EditDepartmentURL = environment.baseURL + 'departments/editDepartment';
  DeleteDepartmentURL = environment.baseURL + 'departments/deleteDepartment';


  constructor(private http: HttpClient) { }

  getDepartments() {
    return this.http.get<BaseResponseModel>(this.GetDepartmentsURL);
  }

  addDepartment(departmentObj: Department) {
    return this.http.post<BaseResponseModel>(this.AddDepartmentURL, departmentObj);
  }

  editDepartment(dpartmentId: string, departmentObj: Department) {
    return this.http.post<BaseResponseModel>(`${this.EditDepartmentURL}/${dpartmentId}`, departmentObj);
  }

  deleteDepartment(dpartmentId: string) {
    return this.http.delete<BaseResponseModel>(`${this.DeleteDepartmentURL}/${dpartmentId}`);
  }

}
