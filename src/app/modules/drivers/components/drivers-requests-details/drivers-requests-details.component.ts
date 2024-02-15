import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IDriverResponse } from '../../../../core/interfaces/driver/idriver-response';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';
import { AuthService } from '../../../../core/services/auth.service';
import { DriverServiceService } from '../../../../core/services/DriverService/driver-service.service';
import { ConfirmDialogModel, ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-drivers-requests-details',
  templateUrl: './drivers-requests-details.component.html',
  styleUrls: ['./drivers-requests-details.component.css']
})
export class DriversRequestsDetailsComponent implements OnInit {


  driver: IDriverResponse = { id: "" };
  id: string = "";
  constructor(public dialog: MatDialog,
    private _DriverService: DriverServiceService,
    private _activatedRoute: ActivatedRoute, private _router: Router, private userService: AuthService) { }


  ngOnInit(): void {
    if (!this.userService.isLoggedIn())
      this._router.navigate([`/auth/login`]);
    this.id = this._activatedRoute.snapshot.queryParams['id'];
    this.getRequestDetails();
  }
  getRequestDetails() {
    this._DriverService.GetJoinRequestDetails(this.id).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this.driver = res.data as IDriverResponse
        }
        else {
          console.log(res.message);
          //this.resMessage = {
          //  message: res.message,
          //  type: BaseConstantModel.DANGER_TYPE
          //}
        }
      },

    );

  }
  ApproveRequest(id: string) {
    this._DriverService.AcceptJoinRequest(this.id).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this._router.navigate([`/main/drivers/requests`]);
        }
        else {
          console.log(res.message);
          //this.resMessage = {
          //  message: res.message,
          //  type: BaseConstantModel.DANGER_TYPE
          //}
        }
      },

    );

  }
  RejectRequest(id: string) {
    this._DriverService.RejectJoinRequest(this.id).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this._router.navigate([`/main/drivers/requests`]);
        }
        else {
          console.log(res.message);
          //this.resMessage = {
          //  message: res.message,
          //  type: BaseConstantModel.DANGER_TYPE
          //}
        }
      },

    );
  }
  openConfirmRejectionModal(id: string) {
    const message = "Are you sure you want to reject this driver request?"
    const dialogData = new ConfirmDialogModel("Reject driver join request", message);
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: "40%",
      height: "auto",
      data: dialogData,
      panelClass: "custom-dialog-container"
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.RejectRequest(id);
      }
    })
  }
  openConfirmAcceptModal(id: string) {
    const message = "Are you sure you want to accept this driver request?"
    const dialogData = new ConfirmDialogModel("Accept driver join request", message);
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: "40%",
      height: "auto",
      data: dialogData,
      panelClass: "custom-dialog-container"
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.ApproveRequest(id);
      }
    })
  }
}
