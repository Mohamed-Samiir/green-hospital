import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { IdriverTripResponse } from '../../../../core/interfaces/driver/idriver-trip-response';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';
import { DriverServiceService } from '../../../../core/services/DriverService/driver-service.service';
import { DriverTripsTableDataSource, DriverTripsTableItem } from './driver-trips-table-datasource';

@Component({
  selector: 'app-driver-trips-table',
  templateUrl: './driver-trips-table.component.html',
  styleUrls: ['./driver-trips-table.component.css']
})
export class DriverTripsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    "completed",
    "date",
    "tripType",
    //"from",
    //"to",
    //"passengerComment",
    "driverName",
    //"driverCode",
    //"driverComment",
    //"tripRate",
    //"paymentMethod",
    //"discount",
    //"fees",
  ];
  @ViewChild(MatTable) table!: MatTable<IdriverTripResponse>
  @Input() search: number = 0
  @Input() tableData: IdriverTripResponse[] = []
  @Output() pageChange = new EventEmitter()
  @Input() pageIndex: number = 0
  @Input() pageSize: number = 10
  @Input() dataLength: number = 1
  @Input() isLoading: boolean = true
  id: string = "";
  constructor(private _driverService: DriverServiceService,
    private _activatedRoute: ActivatedRoute) {
  }

  loadData() {
    this.isLoading = true
    let skip = this.pageIndex * this.pageSize
    this._driverService.GetDriverTripsListPaginated({ skip: skip, take: this.pageSize, driverId: this.id }).subscribe((res: BaseResponseModel) => {
      this.tableData = res.data as IdriverTripResponse[]
      this.dataLength = res.count!
      this.isLoading = false
    })
  }
  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.queryParams['id'];
    this.loadData();
  }

  onChangeRating = (rating: number) => {
    this.search = rating
  }

  onPageChange(e: any) {
    this.pageIndex = e.pageIndex
    this.pageSize = e.pageSize

    this.loadData()
  }


 
}
