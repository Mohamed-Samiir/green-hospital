import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { Procedure } from '../../interfaces/procedure';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {
  GetProceduresURL = environment.baseURL + 'procedures/getProcedures';
  AddProcedureURL = environment.baseURL + 'procedures/addProcedure';
  EditProcedureURL = environment.baseURL + 'procedures/editProcedure';
  DeleteProcedureURL = environment.baseURL + 'procedures/deleteProcedure';


  constructor(private http: HttpClient) { }

  getProcedures() {
    return this.http.get<BaseResponseModel>(this.GetProceduresURL);
  }

  addProcedure(procedureObj: Procedure) {
    return this.http.post<BaseResponseModel>(this.AddProcedureURL, procedureObj);
  }

  editProcedure(procedureId: string, procedureObj: Procedure) {
    return this.http.post<BaseResponseModel>(`${this.EditProcedureURL}/${procedureId}`, procedureObj);
  }

  deleteProcedure(procedureId: string) {
    return this.http.delete<BaseResponseModel>(`${this.DeleteProcedureURL}/${procedureId}`);
  }

}
