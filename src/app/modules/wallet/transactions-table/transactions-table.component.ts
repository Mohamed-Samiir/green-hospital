import { AfterViewInit, Component, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { IClientTransaction } from 'src/app/core/interfaces/wallet/iClientTransaction';
import { TransactionsTableDataSource, TransactionsTableItem } from './transactions-table-datasource';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TransactionsTableItem>;
  @Input() tableData: IClientTransaction[] = []
  @Output() pageChange = new EventEmitter()
  @Input() pageIndex: number = 0
  @Input() pageSize: number = 10
  @Input() dataLength: number = 1
  @Input() isLoading: boolean = true
  dataSource: TransactionsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['transactionType', 'amount', "createdOn" ];

  constructor() {
    this.dataSource = new TransactionsTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onPageChange(e: any){
    this.pageChange.emit(e)
  }
}
