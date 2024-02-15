import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from 'src/app/core/services/TripService/trip.service';
import { IClientResponse } from '../../../../core/interfaces/client/iclient-response';
import { IclientTripResponse } from '../../../../core/interfaces/client/iclient-trip-response';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';
import { AlertifyService } from '../../../../core/services/alertify-services/alertify.service';
import { ClientServiceService } from '../../../../core/services/ClientService/client-service.service';
import { ConfirmDialogModel, ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-passanger-details',
  templateUrl: './passanger-details.component.html',
  styleUrls: ['./passanger-details.component.css']
})
export class PassangerDetailsComponent implements OnInit {

  client: IClientResponse = { id: "" };
  id: string = "";

  constructor(public dialog: MatDialog, private _clientService: ClientServiceService,
    private _activatedRoute: ActivatedRoute, private _router: Router, private _alertify: AlertifyService, private tripService: TripService) { }


  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.queryParams['id'];
    this.getClientDetails();
  }
  getClientDetails() {
    this._clientService.GetClientDetails(this.id).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this.client = res.data as IClientResponse
        }
        else {
        }
      },

    );
  }

  openBlockModal(id: string) {
    const message = "Are you sure you want to block this client?"
    const dialogData = new ConfirmDialogModel("Block Client", message);
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: "40%",
      height: "auto",
      data: dialogData,
      panelClass: "custom-dialog-container"
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.BlockClient(id);
      }
    })
  }
  BlockClient(id: string) {
    this._clientService.BlockClient(this.id).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this._alertify.success(res.message || '');
          this._router.navigate([`/main/passangers`]);
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
    const message = "Are you sure you want to Activate this Client?"
    const dialogData = new ConfirmDialogModel("Activate Client", message);
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
    this._clientService.UNBlockClient(this.id).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this._alertify.success(res.message || '');
          this._router.navigate([`/main/passangers`]);
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

  cancelPassangerTrip(id: string) {
    this.tripService.CancelTripRequest(id).subscribe(res => {
      if (res.isSuccess) {

        this._alertify.success("Trip canceled successfully.")
      }

    })
  }

  openCancelTripConfirmationModal(id: string) {
    const message = "Are you sure you want to cancel this trip?"
    const dialogData = new ConfirmDialogModel("Cancel Trip", message);
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: "40%",
      height: "auto",
      data: dialogData,
      panelClass: "custom-dialog-container"
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.cancelPassangerTrip(id);
      }
    })
  }
}
