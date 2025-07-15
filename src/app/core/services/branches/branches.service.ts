import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { AddBranchModel } from '../../interfaces/branch/add-branch-model';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  GetBranchesURL = environment.baseURL + 'branches/getBranches';
  AddBranchURL = environment.baseURL + 'branches/addBranch';
  EditBranchURL = environment.baseURL + 'branches/editBranch';
  DeleteBranchURL = environment.baseURL + 'branches/deleteBranch';

  constructor(private http: HttpClient) { }

  getBranches() {
    return this.http.get<BaseResponseModel>(this.GetBranchesURL);
  }

  addBranch(branchObj: AddBranchModel) {
    return this.http.post<BaseResponseModel>(this.AddBranchURL, branchObj);
  }

  editBranch(branchId: string, branchObj: AddBranchModel) {
    return this.http.post<BaseResponseModel>(`${this.EditBranchURL}/${branchId}`, branchObj);
  }

  deleteBranch(branchId: string) {
    return this.http.delete<BaseResponseModel>(`${this.DeleteBranchURL}/${branchId}`);
  }
}
