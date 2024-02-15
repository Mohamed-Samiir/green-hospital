import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Ipromotion } from 'src/app/core/interfaces/promotions/ipromotion';
import { PromotionsTableDataSource, PromotionsTableItem } from './promotions-table-datasource';

@Component({
  selector: 'app-promotions-table',
  templateUrl: './promotions-table.component.html',
  styleUrls: ['./promotions-table.component.css']
})
export class PromotionsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PromotionsTableItem>;
  @Input() tableData: Ipromotion[] = []

  // dataSource: PromotionsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['promoCode', 'expDate', 'classification', 'noUsers', 'used', 'discount', 'actions'];

  constructor() {
    // this.dataSource = new PromotionsTableDataSource();
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }
}
