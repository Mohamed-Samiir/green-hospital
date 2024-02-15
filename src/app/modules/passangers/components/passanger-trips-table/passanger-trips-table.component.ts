import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { IClientResponse } from '../../../../core/interfaces/client/iclient-response';
import { IclientTripResponse } from '../../../../core/interfaces/client/iclient-trip-response';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';
import { ClientServiceService } from '../../../../core/services/ClientService/client-service.service';
import { PassangerTripsTableDataSource, PassangerTripsTableItem } from './passanger-trips-table-datasource';

@Component({
  selector: 'app-passanger-trips-table',
  templateUrl: './passanger-trips-table.component.html',
  styleUrls: ['./passanger-trips-table.component.css']
})
export class PassangerTripsTableComponent implements OnInit {

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    "trpStats",
    "trpStrtDat",
    "tripType",
    "from",
    "to",
    "driverName",
    "driverCode",
    "cancelTrip"
  ];
  @ViewChild(MatTable) table!: MatTable<IclientTripResponse>;
  @Input() search: number = 0
  @Input() tableData: IclientTripResponse[] = []
  @Output() pageChange = new EventEmitter()
  @Output() cancelTrip = new EventEmitter()
  @Input() pageIndex: number = 0
  @Input() pageSize: number = 10
  @Input() dataLength: number = 1
  @Input() isLoading: boolean = true
  id: string = "";
  constructor(private _clientService: ClientServiceService,
    private _activatedRoute: ActivatedRoute) {
  }

  loadData() {
    this.isLoading = true
    let skip = this.pageIndex * this.pageSize
    this._clientService.GetClientTripsListPaginated({ skip: skip, take: this.pageSize, ClientId: this.id }).subscribe((res: BaseResponseModel) => {
      this.tableData = res.data as IclientTripResponse[]
      this.dataLength = res.count!
      this.isLoading = false
    })
  }
  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.queryParams['id'];
    this.loadData();
  }

  onPageChange(e: any) {
    this.pageIndex = e.pageIndex
    this.pageSize = e.pageSize

    this.loadData()
  }

  onCancelTrip(tripId: string) {
    this.cancelTrip.emit(tripId)
    this.loadData();
  }
}
