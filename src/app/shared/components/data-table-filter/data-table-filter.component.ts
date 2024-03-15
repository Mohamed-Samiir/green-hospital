import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataGridFilter } from 'src/app/core/interfaces/data-grid-filter';
import { faCoffee, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
  faCoffee = faCoffee;
  faChevronUp = faChevronUp
  faChevronDown = faChevronDown
  constructor() { }

  ngOnInit() {
  }

  createFiltersForm() {
    for (let i = 0; i < this.filters.length; i++) {
      this.filtersForm.addControl(this.filters[i].controlName, new FormControl())
    }

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
    this.isExpanded = !this.isExpanded
  }

}
