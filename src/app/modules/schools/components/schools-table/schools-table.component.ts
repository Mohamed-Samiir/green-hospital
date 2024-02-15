import { AfterViewInit, Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ISchoolResponse } from 'src/app/core/interfaces/schools/ischool-response';
import { SchoolsTableDataSource, SchoolsTableItem } from './schools-table-datasource';

@Component({
  selector: 'app-schools-table',
  templateUrl: './schools-table.component.html',
  styleUrls: ['./schools-table.component.css']
})
export class SchoolsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<SchoolsTableItem>;
  @Input() tableData: ISchoolResponse[] = []
  @Output() onDeleteSchool = new EventEmitter()
  @Output() pageChange = new EventEmitter()
  @Input() pageIndex: number = 0
  @Input() pageSize: number = 10
  @Input() dataLength: number = 1
  @Input() isLoading: boolean = true
  dataSource: SchoolsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nameAr', "nameEn", "address", "actions"];

  constructor() {
    this.dataSource = new SchoolsTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  DeleteSchol(id: string) {
    this.onDeleteSchool.emit(id)
  }
  onPageChange(e: any){
    this.pageChange.emit(e)
  }
}
