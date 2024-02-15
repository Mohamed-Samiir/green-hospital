import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroup } from '../../../../core/interfaces/trips/i-group';
import { IgroupClients } from '../../../../core/interfaces/trips/igroup-clients';
import { ItripRequestResponse } from '../../../../core/interfaces/trips/itrip-request-response';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';
import { GroupsServiceService } from '../../../../core/services/GroupsService/groups-service.service';
import { MatDialog } from '@angular/material/dialog';
import { TripService } from '../../../../core/services/TripService/trip.service';
import { ReplaceGroupDialogModel, ReplaceGroupModalComponent } from 'src/app/shared/components/replace-group-modal/replace-group-modal.component';
import { IgroupAssignValue } from '../../../../core/interfaces/trips/igroup-assign-value';
import { ConfirmDialogModel, ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-recursive-group-details',
  templateUrl: './recursive-group-details.component.html',
  styleUrls: ['./recursive-group-details.component.css']
})
export class RecursiveGroupDetailsComponent implements OnInit {
  request: ItripRequestResponse = { id: "", clientId: "" };
  id: string = "";
  group: IGroup = {};
  availableGroups: IGroup[] = []
  Clients: IgroupClients[] = []
  groupDetails: IgroupAssignValue = { groupId: this.id }
  isLoading: boolean = false
  constructor(public dialog: MatDialog, private _tripService: TripService,
    private _goupService: GroupsServiceService,
    private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.groupDetails.groupDetails = []
    this.id = this._activatedRoute.snapshot.queryParams['id'];
    this.groupDetails.groupId = this.id;
    this.getDetails();
    this.getGroupMemberDetails(this.id);
  }
  getDetails() {
    this._goupService.GetGroupDetails(this.id).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this.group = res.data as IGroup
          this.groupDetails.driverId = this.group.driverId
        }
      },
    );
  }

  getDetailsGroup() {
    this._goupService.GetGroupDetails(this.id || "").subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this.group = res.data as IGroup
        }
      },

    );

  }
  backToGroupsList() {
    this._router.navigate([`/main/trips/recursive`]);
  }
  getGroupMemberDetails(groupId: any) {
    this._goupService.getGroupMemberDetails(groupId || "").subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this.Clients = res.data as IgroupClients[]
          this.groupDetails.groupDetails = []
          this.groupDetails.groupDetails = this.Clients.map(a => ({
            groupDetailsId: a.id,
            cost: a.cost
          }));
          console.log(this.Clients)
          console.log(res.data)
        }
        else {
        }
      },

    );
  }
  ApproveGroup() {
    var ifContainZeroCost = this.groupDetails.groupDetails!.some(x => x.cost! <= 0);
    if (ifContainZeroCost)
      this.openNotValidCostModal();
    else {
      if (this.group.avaliableSeats! > 0) {
        this.openNotValidNumberOfUsersModal();
      }
      else {
        this.openValidationModal("Are you sure you want to approve this group?");
      }
    }
  }
  SaveGroup() {
    console.log(this.groupDetails)
    this._goupService.ApproveGroup(this.groupDetails).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this._router.navigate([`/main/trips/recursive`]);
        }
        else {
          this.openValidationModal(res.message!);
        }
      },
    );
  }
  openNotValidCostModal() {
    const message = "One or more client group not have suitable cost "
    const dialogData = new ConfirmDialogModel("Not Valid Cost", message);
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: "40%",
      height: "auto",
      data: dialogData,
      panelClass: "custom-dialog-container"
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {

      }
    })
  }
  openNotValidNumberOfUsersModal() {
    const message = "Do you want to save this group with free seats? "
    const dialogData = new ConfirmDialogModel("Available Seats Warning", message);
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: "40%",
      height: "auto",
      data: dialogData,
      panelClass: "custom-dialog-container"
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.SaveGroup();
      }
    })
  }
  openValidationModal(errorMessage: string) {
    const message = errorMessage
    const dialogData = new ConfirmDialogModel("Vlaidation Message ", message);
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: "40%",
      height: "auto",
      data: dialogData,
      panelClass: "custom-dialog-container"
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.SaveGroup()
      }
    })
  }
  ChangeCost(id: any, index: number, event: any) {
    this.groupDetails.groupDetails![index].cost = event.target.value
  }
  openReplaceGroupModal(isDeduction: boolean, clientId: string | undefined) {
    const title = "Replace Driver Group"
    const dialogData = new ReplaceGroupDialogModel(title, [], clientId);
    const dialogRef = this.dialog.open(ReplaceGroupModalComponent, {
      width: "70%",
      height: "500px",
      data: dialogData,
      panelClass: "relace-group-dialog-container"
    });
    this._goupService.GetAvilableGroupsForReplacement(clientId || "").subscribe((res: BaseResponseModel) => {
      if (res.isSuccess) {
        this.availableGroups = res.data as IGroup[]
        dialogRef.componentInstance.groups = this.availableGroups
      }

      dialogRef.afterClosed().subscribe((value: BaseResponseModel) => {
        //this._router.navigate([`/main/trips/recursive`]);
      })
    })
  }
}
