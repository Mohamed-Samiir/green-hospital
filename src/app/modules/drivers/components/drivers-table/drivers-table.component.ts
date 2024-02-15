import { AfterViewInit, Component, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { IDriverResponse } from 'src/app/core/interfaces/driver/idriver-response';
import { DriversTableDataSource, DriversTableItem } from './drivers-table-datasource';

@Component({
  selector: 'app-drivers-table',
  templateUrl: './drivers-table.component.html',
  styleUrls: ['./drivers-table.component.css']
})
export class DriversTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DriversTableItem>;
  dataSource: DriversTableDataSource;
  @Input() tableData: IDriverResponse[] = []
  @Output() pageChange = new EventEmitter()
  @Input() pageIndex: number = 0
  @Input() pageSize: number = 10
  @Input() dataLength: number = 1
  @Input() isLoading: boolean = true

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'phoneNumber', 'driverCode', 'email'];

  constructor(private _router: Router) {
    this.dataSource = new DriversTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  filterTable = (filter: number) => {
    if (filter)
      this.table.dataSource = this.dataSource.data.filter(row => row.rating == filter);
    else
      this.table.dataSource = this.dataSource?.data
  }

  onChangePage(e: any) {
    this.pageChange.emit(e)
  }
  GoToDetails(id: string) {
    this._router.navigate([`/main/drivers/details`], {
      queryParams: {
        id: id,
      }
    });
  }
}
