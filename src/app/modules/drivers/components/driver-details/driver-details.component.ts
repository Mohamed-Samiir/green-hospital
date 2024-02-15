import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IDriverResponse } from '../../../../core/interfaces/driver/idriver-response';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';
import { AlertifyService } from '../../../../core/services/alertify-services/alertify.service';
import { AuthService } from '../../../../core/services/auth.service';
import { DriverServiceService } from '../../../../core/services/DriverService/driver-service.service';
import { ConfirmDialogModel, ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {

  Driver: IDriverResponse = { id: "" };
  id: string = "";

  constructor(public dialog: MatDialog, private _driverService: DriverServiceService,
    private _activatedRoute: ActivatedRoute,
    private _alertify: AlertifyService, private _router: Router, private userService: AuthService) { }


  ngOnInit(): void {
    if (!this.userService.isLoggedIn())
      this._router.navigate([`/auth/login`]);
    this.id = this._activatedRoute.snapshot.queryParams['id'];
    this.getDriverDetails();
  }
  getDriverDetails() {
    this._driverService.GetDriverDetails(this.id).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this.Driver = res.data as IDriverResponse
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

  openBlockModal(id: string) {
    const message = "Are you sure you want to block this Driver?"
    const dialogData = new ConfirmDialogModel("Block Driver", message);
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: "40%",
      height: "auto",
      data: dialogData,
      panelClass: "custom-dialog-container"
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.BlockDriver(id);
      }
    })
  }
  BlockDriver(id: string) {
    this._driverService.BlockDriver(this.id).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this._alertify.success(res.message || '');
          this._router.navigate([`/main/drivers`]);
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
  openUnBlockModal(id: string) {
    const message = "Are you sure you want to Activate this Driver?"
    const dialogData = new ConfirmDialogModel("Activate Driver", message);
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: "40%",
      height: "auto",
      data: dialogData,
      panelClass: "custom-dialog-container"
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.UnBlockDriver(id);
      }
    })
  }
  UnBlockDriver(id: string) {
    this._driverService.UnBlockDriver(this.id).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this._alertify.success(res.message || '');
          this._router.navigate([`/main/drivers`]);
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
}

