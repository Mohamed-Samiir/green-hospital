import { Component, OnInit } from '@angular/core';
import { FilterTypes } from 'src/app/core/enums/filter-types.enum';
import { DataGridAction } from 'src/app/core/interfaces/data-grid-action';
import { DataGridColumn } from 'src/app/core/interfaces/data-grid-column';
import { DataGridFilter } from 'src/app/core/interfaces/data-grid-filter';
import { Specialization } from 'src/app/core/interfaces/specialization';
import { SpecializationsService } from 'src/app/core/services/specializations/specializations.service';

@Component({
  selector: 'app-specializations-list',
  templateUrl: './specializations-list.component.html',
  styleUrls: ['./specializations-list.component.css']
})
export class SpecializationsListComponent implements OnInit {

  specializationsList: Specialization[] = []
  gridData: any[] = []
  filterTypes = FilterTypes

  constructor(private specializationsService: SpecializationsService) { }

  gridColumns: DataGridColumn[] = [
    {
      header: "التخصص الرئيسي",
      field: "name",
      type: 1
    },
    {
      header: "التخصصات الفرعية",
      field: "subSpecializations",
      type: 2
    }
  ]

  gridFilters: DataGridFilter[] = [
    {
      controlName: "specName",
      label: "اسم التخصص",
      type: this.filterTypes.text
    },
    {
      controlName: "subSpecName",
      label: "اسم التخصص الفرعي",
      type: this.filterTypes.text
    }
  ]

  gridActions: DataGridAction = {
    showDetails: true,
    showDelete: true,
    showEdit: true,
  }

  ngOnInit() {
    this.getSpecializations()
  }

  getSpecializations() {
    this.specializationsService.getSpecializations().subscribe(res => {
      if (res.isSuccess) {
        this.specializationsList = res.data
        this.gridData = res.data.map((spec: any) => {
          let modifiedSpec = {
            ...spec,
            subSpecializations: spec.subSpecializations.map((subSpec: any) => subSpec.name)
          }

          return modifiedSpec
        })
      }
    })
  }

  setFilteredData(filteredData: any[]) {

  }

  showAddDialog() {

  }

  onShowDetails(id: any) {

  }

  openEditPopup(id: any) {

  }

  openDeleteConfirmation(id: any) {

  }

}
