import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroup } from 'src/app/core/interfaces/trips/i-group';
import { IAssignGroupToDriverModal } from '../../../../core/interfaces/trips/i-assign-group-to-driver-modal';
import { ItripRequestResponse } from '../../../../core/interfaces/trips/itrip-request-response';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';
import { GroupsServiceService } from '../../../../core/services/GroupsService/groups-service.service';
import { TripService } from '../../../../core/services/TripService/trip.service';
import { ConfirmDialogModel, ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  request: ItripRequestResponse = { id: "", clientId:"" };
  id: string = "";
  groups: IGroup[] = []
  selectedDriverId?: string;
  selectedGroupId?: string;

  constructor(public dialog: MatDialog,
    private _tripService: TripService,
    private _goupService: GroupsServiceService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    @Inject(DOCUMENT) document: Document) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.queryParams['id'];
    this.getDetails();
    this.getGroups();
  }
  getDetails() {
    this._tripService.GetRequestDetails(this.id).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this.request = res.data as ItripRequestResponse
        }
        else {
          console.log(res.message);
        }
      },
    );
  }

  getGroups() {
    this._goupService.GetAvilableGroupsForAssignment(this.id).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this.groups = res.data as IGroup[]
          console.log(this.groups)
        }
        else {
          console.log(res.message);
        }
      },
    );
  }

  ChangeSelection(event: any) {
    this.selectedDriverId = event.checked ? event.source.value : ""
    if (this.selectedDriverId !== "") {
      this.selectedGroupId = this.groups.find(a => a.driverId === this.selectedDriverId)?.id
      console.log(this.selectedGroupId)
    }
  }

  SaveGroup() {
    this.openConfirmModal();
  }
  openConfirmModal() {
    const message = "Are you sure you want to assign this trip request?"
    const dialogData = new ConfirmDialogModel("Assign trip request to driver", message);
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: "40%",
      height: "auto",
      data: dialogData,
      panelClass: "custom-dialog-container"
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.ApproveRequest();
      }
    })
  }
  ApproveRequest() {
    var model: IAssignGroupToDriverModal
    model = { driverId: this.selectedDriverId, requestId: this.id }
    if (this.selectedGroupId)
      model.groupId = this.selectedGroupId
    this._goupService.AssignGroupToDriver(model).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this.groups = res.data as IGroup[]
          this._router.navigate([`/main/trips/recursive`]);
        }
        else {
          console.log(res.message);
        }
      },
    );
  }

  backToGroupsList() {
    this._router.navigate([`/main/trips/recursive`]);
  }
  ViewProfileDetails(clntId: string) {
    this._router.navigate([`/main/passangers/details`], {
      queryParams: {
        id: clntId,
      }
    });
  }
}
