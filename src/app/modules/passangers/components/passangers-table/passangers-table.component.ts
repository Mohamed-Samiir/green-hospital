import { AfterViewInit, Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { IClientResponse } from 'src/app/core/interfaces/client/iclient-response';
import { PassangersTableDataSource, PassangersTableItem } from './passangers-table-datasource';

@Component({
  selector: 'app-passangers-table',
  templateUrl: './passangers-table.component.html',
  styleUrls: ['./passangers-table.component.css']
})
export class PassangersTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PassangersTableItem>;
  @Input() tableData: IClientResponse[] = []
  @Output() pageChange = new EventEmitter()
  @Input() pageIndex: number = 0
  @Input() pageSize: number = 10
  @Input() dataLength: number = 1
  @Input() isLoading: boolean = true

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'status', 'phoneNumber', 'email', 'payments'];

  constructor(
    private _router: Router) {
  }

  ngAfterViewInit(): void {

  }

  onPageChange(e: any) {
    this.pageChange.emit(e)
  }
  GoToDetails(id: string) {
    this._router.navigate([`/main/passangers/details`], {
      queryParams: {
        id: id,
      }
    });
  }
}
