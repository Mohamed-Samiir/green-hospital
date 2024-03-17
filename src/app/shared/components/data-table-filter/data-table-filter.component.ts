import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataGridFilter } from 'src/app/core/interfaces/data-grid-filter';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FilterTypes } from 'src/app/core/enums/filter-types.enum';

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
  filterTypes = FilterTypes
  filtersCount: number = 0
  faChevronUp = faChevronUp
  faChevronDown = faChevronDown
  constructor() { }

  ngOnInit() {
    this.createFiltersForm()
    this.filtersForm.valueChanges.subscribe(filters => {
      this.filtersCount = 0
      let filterEnteries = Object.keys(filters)
      for (let entry of filterEnteries) {
        if (filters[entry])
          this.filtersCount++
      }
      this.filterData()
    });
  }

  createFiltersForm() {
    for (let i = 0; i < this.filters.length; i++) {
      this.filtersForm.addControl(this.filters[i].controlName, new FormControl())
    }

  }

  getFilterDDL() {

  }

  filterData() {
    this.filteredData = this.data
    for (let filter of this.filters) {
      if (this.filtersForm.get(filter.controlName)?.value) {
        if (filter.type == this.filterTypes.text || filter.type == this.filterTypes.number) {
          this.filteredData = this.filteredData.filter(row => row[filter.controlName].includes(this.filtersForm.get(filter.controlName)?.value))
        }
      }
    }
    this.getFilteredData.emit(this.filteredData)
  }

  clearFilters() {

  }

  saveFilters() {

  }

  getQueryFilters() {

  }

  toggleFilters() {
    this.isExpanded = !this.isExpanded
  }

}
