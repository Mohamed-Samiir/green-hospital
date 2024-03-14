import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataGridFilter } from 'src/app/core/interfaces/data-grid-filter';

@Component({
  selector: 'app-data-table-filter',
  templateUrl: './data-table-filter.component.html',
  styleUrls: ['./data-table-filter.component.css']
})
export class DataTableFilterComponent implements OnInit {

  @Input() data: any[] = []
  @Input() filters: DataGridFilter[] = []
  @Output() getFilteredData: EventEmitter<any[]> = new EventEmitter<any[]>()

  filteredData: any[] = []
  filtersForm: FormGroup = new FormGroup({})
  filtersDDLs: Map<string, any[]> = new Map<string, any[]>()
  isExpanded: boolean = false

  constructor() { }

  ngOnInit() {
  }

  createFiltersForm() {

  }

  getFilterDDL() {

  }

  filterData() {

  }

  clearFilters() {

  }

  saveFilters() {

  }

  getQueryFilters() {

  }

  toggleFilters() {

  }

}
