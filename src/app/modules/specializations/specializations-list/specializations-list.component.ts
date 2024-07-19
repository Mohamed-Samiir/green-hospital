import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterTypes } from 'src/app/core/enums/filter-types.enum';
import { DataGridAction } from 'src/app/core/interfaces/data-grid-action';
import { DataGridColumn } from 'src/app/core/interfaces/data-grid-column';
import { DataGridFilter } from 'src/app/core/interfaces/data-grid-filter';
import { Specialization } from 'src/app/core/interfaces/specialization';
import { SpecializationsService } from 'src/app/core/services/specializations/specializations.service';
import { AddSpecializationComponent } from '../add-specialization/add-specialization.component';
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';

@Component({
  selector: 'app-specializations-list',
  templateUrl: './specializations-list.component.html',
  styleUrls: ['./specializations-list.component.css']
})
export class SpecializationsListComponent implements OnInit {

  specializationsList: Specialization[] = []
  gridData: any[] = []
  filterTypes = FilterTypes
  isShowAddDialog: boolean = false
  selectedSpecForEdit: Specialization | undefined
  isEdit: boolean = false

  @ViewChild(AddSpecializationComponent) addSpecComponent!: AddSpecializationComponent

  constructor(private specializationsService: SpecializationsService,
    private confirmationService: ConfirmationService,
    private tranlslate: TranslateService,
    private alertify: AlertifyService,
  ) { }

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
    showDetails: false,
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
    this.gridData = filteredData
  }

  showAddDialog() {
    this.isShowAddDialog = true
  }

  hideAddDialog() {
    this.isShowAddDialog = false
    this.selectedSpecForEdit = undefined
    this.isEdit = false
    this.addSpecComponent.resetAddForm()
  }

  openEditPopup(id: any) {
    this.isEdit = true
    let selectedSpecialization = this.specializationsList.find(spec => spec._id == id)
    if (selectedSpecialization) {
      this.selectedSpecForEdit = selectedSpecialization
      this.showAddDialog()
    }
  }

  openDeleteConfirmation(specId: string) {
    let selectedSpec = this.specializationsList.find(spec => spec._id == specId)
    this.confirmationService.confirm({
      key: "confirmDelete",
      message: `${this.tranlslate.instant('GENERIC.DELETE_MSG')} ${selectedSpec?.name}`,
      acceptLabel: this.tranlslate.instant('GENERIC.CONFIRM'),
      rejectLabel: this.tranlslate.instant('GENERIC.IGNORE'),
      accept: () => {
        this.specializationsService.deleteSpecialization(specId).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.tranlslate.instant('GENERIC.DELETE_SUCCESS'))
            this.getSpecializations()
          } else {
            this.alertify.error(res.message)
          }
        })
      }
    });
  }

  onAddSpecialization() {
    this.hideAddDialog()
    this.getSpecializations()
  }

}
