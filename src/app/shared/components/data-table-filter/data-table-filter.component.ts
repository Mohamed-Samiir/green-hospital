import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataGridFilter } from 'src/app/core/interfaces/data-grid-filter';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FilterTypes } from 'src/app/core/enums/filter-types.enum';
import { DataGridDdlsService } from 'src/app/core/services/dataGrid/data-grid-ddls.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data-table-filter',
  templateUrl: './data-table-filter.component.html',
  styleUrls: ['./data-table-filter.component.css']
})
export class DataTableFilterComponent implements OnInit, OnChanges {

  @Input() data: any[] = []
  @Input() filters: DataGridFilter[] = []
  @Output() getFilteredData: EventEmitter<any[]> = new EventEmitter<any[]>()

  isShowSaveFilterDialog: boolean = false
  filtersToSave: any[]
  filteredData: any[] = []
  filtersForm: FormGroup = new FormGroup({})
  filtersDDLs: Map<string, any[]> = new Map<string, any[]>()
  isExpanded: boolean = false
  filterTypes = FilterTypes
  filtersCount: number = 0
  faChevronUp = faChevronUp
  faChevronDown = faChevronDown

  constructor(private dataGridDdlsService: DataGridDdlsService, private router: ActivatedRoute) { }

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue) {
      this.getFiltersFromUrl()
    }
  }

  createFiltersForm() {
    for (let i = 0; i < this.filters.length; i++) {
      this.filtersForm.addControl(this.filters[i].controlName, new FormControl())
      if (this.filters[i].type == this.filterTypes.dropdown) {
        this.getFilterDDL(this.filters[i])
      }
    }

  }

  getFilterDDL(filter: DataGridFilter) {
    this.dataGridDdlsService.getDropdownData(filter.dataApi).subscribe(res => {
      if (res.isSuccess) {
        this.filtersDDLs.set(filter.controlName, res.data)
      }
    })
  }

  filterData() {
    this.filteredData = this.data
    for (let filter of this.filters) {
      if (this.filtersForm.get(filter.controlName)?.value) {
        if (filter.type == this.filterTypes.text || filter.type == this.filterTypes.number) {
          this.filteredData = this.filteredData.filter(row => row[filter.controlName].includes(this.filtersForm.get(filter.controlName)?.value))
        } else if (filter.type == this.filterTypes.dropdown) {
          //multi select & single value
          if (filter.multiSelect && !filter.matchMulti) {
            let filterValues = this.filtersForm.get(filter.controlName)?.value
            this.filteredData = this.filteredData.filter(row => filterValues.includes(row[filter.matchWith]) || !filterValues.length)
          }
          //multi select & multiple values
          if (filter.multiSelect && filter.matchMulti) {

            let filterValues = this.filtersForm.get(filter.controlName)?.value
            this.filteredData = this.filteredData.filter(row => {
              return filterValues.filter((val: any) => row[filter.matchWith].includes(val)).length || !filterValues.length
            })
          }
          //single select & single value
          if (!filter.multiSelect && !filter.matchMulti) {
            let filterValue = this.filtersForm.get(filter.controlName)?.value
            this.filteredData = this.filteredData.filter(row => row[filter.matchWith] == filterValue)
          }
          //single select & multiple values
          if (!filter.multiSelect && !filter.matchMulti) {
            let filterValue = this.filtersForm.get(filter.controlName)?.value
            this.filteredData = this.filteredData.filter(row => row[filter.matchWith].includes(filterValue))
          }
        }
      }
    }
    this.getFilteredData.emit(this.filteredData)
  }

  clearFilters() {
    this.filtersForm.reset()
  }

  saveFilters() {

  }

  getQueryFilters() {

  }

  toggleFilters() {
    this.isExpanded = !this.isExpanded
  }

  showAddShortcutPopup() {
    let filtersObjects: any[] = []

    Object.keys(this.filtersForm.value).forEach(key => {
      if (this.filtersForm.get(key).value) {
        filtersObjects.push({ label: key, value: this.filtersForm.get(key).value })
      }
    })
    this.filtersToSave = filtersObjects
    this.isShowSaveFilterDialog = true
  }

  hideSaveFilterDialog() {
    this.isShowSaveFilterDialog = false
  }

  onAddShortsut() {

  }

  getFiltersFromUrl() {
    this.router.queryParams.subscribe(params => {
      Object.keys(params).forEach(filter => {
        this.filtersForm.get(filter).setValue(params[filter])
      })
    })
  }

}
