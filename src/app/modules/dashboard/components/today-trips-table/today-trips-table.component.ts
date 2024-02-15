import { AfterViewInit, Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { IClientResponse } from 'src/app/core/interfaces/client/iclient-response';
import { TodayTripsTableItem } from './today-trips-table-datasource';

@Component({
  selector: 'app-today-trips-table',
  templateUrl: './today-trips-table.component.html',
  styleUrls: ['./today-trips-table.component.css']
})
export class TodayTripsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TodayTripsTableItem>;
  @Input() search: number = 0
  @Input() tableData: IClientResponse[] = []
  @Output() pageChange = new EventEmitter()
  @Output() openViewDetails = new EventEmitter()
  @Input() pageIndex: number = 0
  @Input() pageSize: number = 10
  @Input() dataLength: number = 1
  @Input() isLoading: boolean = true

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['tripType', 'driverName', 'driverCode', 'tripstatNamEn', 'clientName','tripToAdress','scolName', 'viewDetails'];

  constructor(
    private _router: Router) {
  }

  ngAfterViewInit(): void {

  }

  onPageChange(e: any) {
    this.pageChange.emit(e)
  }
  ViewDetails(id: string) {
    this.openViewDetails.emit(id)
  }
}
