import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { IReassignGroupToDriverModel } from '../../interfaces/trips/iReassign-group-to-driver-model';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class GroupsServiceService {

  AvilableGroupsForAssignmentURL = environment.baseURL + 'ManagingGroups/get-available-groups/';
  AvilableGroupsForReplacementURL = environment.baseURL + 'ManagingGroups/get-available-groups-for-replacement/';
  GroupDetailsURL = environment.baseURL + 'ManagingGroups/get-group-details/';
  GroupMemberDetailsURL = environment.baseURL + 'ManagingGroups/get-group-member-details/';
  GroupRenewMemberDetailsURL = environment.baseURL + 'ManagingGroups/get-group-renew-member-details/';
  AllGroupsURL = environment.baseURL + 'ManagingGroups/get-groups';
  AssignGroupDriverURL = environment.baseURL + 'ManagingGroups/assign-driver-group';
  ApproveGroupURL = environment.baseURL + 'ManagingGroups/approve-group';
  ReassignGroupToDriverURL = environment.baseURL + 'ManagingGroups/reassign-group-to-request';
  RenewListURL = environment.baseURL + 'ManagingGroups/renew-list';
  GroupDetailsDataURL = environment.baseURL + 'ManagingGroups/get-renew-details/';
  RenewGroupURL = environment.baseURL + 'ManagingGroups/renew-group';
  constructor(private http: HttpClient, private router: Router) { }
  GetAvilableGroupsForAssignment(id: string) {
    return this.http.get<BaseResponseModel>(this.AvilableGroupsForAssignmentURL + id);
  }
  GetAvilableGroupsForReplacement(id: string) {
    return this.http.get<BaseResponseModel>(this.AvilableGroupsForReplacementURL + id);
  }
  GetGroups() {
    return this.http.get<BaseResponseModel>(this.AllGroupsURL);

  }
  GetGroupDetails(id: string) {
    return this.http.get<BaseResponseModel>(this.GroupDetailsURL + id);

  }
  AssignGroupToDriver(model: any) {
    return this.http.post<BaseResponseModel>(this.AssignGroupDriverURL, model);

  }
  getGroupMemberDetails(id: string) {
    return this.http.get<BaseResponseModel>(this.GroupMemberDetailsURL + id);

  } getRenewGroupMemberDetails(id: string) {
    return this.http.get<BaseResponseModel>(this.GroupRenewMemberDetailsURL + id);

  }
  ApproveGroup(model: any) {
    return this.http.post<BaseResponseModel>(this.ApproveGroupURL, model);

  }
  RenewGroup(model: any) {
    return this.http.post<BaseResponseModel>(this.RenewGroupURL, model);

  }

  ReassignGroupToDriver(model: IReassignGroupToDriverModel) {
    return this.http.post<BaseResponseModel>(this.ReassignGroupToDriverURL, model);
  }

  getGroupsNeedToBeRenewed() {
    return this.http.get<BaseResponseModel>(this.RenewListURL);
  }
  GetRenewDetails(id: string) {
    return this.http.get<BaseResponseModel>(this.GroupDetailsDataURL + id);

  }
}
