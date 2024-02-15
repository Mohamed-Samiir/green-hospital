import { Component, OnInit } from '@angular/core';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { DriverServiceService } from 'src/app/core/services/DriverService/driver-service.service';
import { MatDialog } from '@angular/material/dialog';
import { TodayTripsDetailsDialogModel, TodayTripsDetailsModalComponent } from '../today-trips-details-modal/today-trips-details-modal.component';

@Component({
  selector: 'app-today-trips-summary',
  templateUrl: './today-trips-summary.component.html',
  styleUrls: ['./today-trips-summary.component.css']
})
export class TodayTripsSummaryComponent implements OnInit {
  search: number = 0
  tableData: any[] = []
  pageIndex: number = 0
  pageSize: number = 10
  dataLength: number = 1
  isLoading: boolean = false
  constructor(public dialog: MatDialog, private driverService: DriverServiceService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.isLoading = true
    let skip = this.pageIndex * this.pageSize
    this.driverService.GetAllTodayTrips({ skip: skip, take: this.pageSize }).subscribe((res: BaseResponseModel) => {
      this.tableData = res.data
      this.dataLength = res.count!
      this.isLoading = false
    })
  }

  onChangeRating = (rating: number) => {
    this.search = rating
  }

  onPageChange(e: any) {
    this.pageIndex = e.pageIndex
    this.pageSize = e.pageSize


    this.loadData()
  }
  ViewDetailsModal(id: string) {
    const dialogData = new TodayTripsDetailsDialogModel("Trip details ", []);
    const dialogRef = this.dialog.open(TodayTripsDetailsModalComponent, {
      width: "70%",
      height: "auto",
      data: dialogData,
      panelClass: "relace-group-dialog-container"
    });
    this.driverService.GetTripDetails(id).subscribe(res => {
      dialogRef.componentInstance.groups = res.data
    })

  }
}
