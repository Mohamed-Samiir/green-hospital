import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { FilterTypes } from 'src/app/core/enums/filter-types.enum';
import { DataGridAction } from 'src/app/core/interfaces/data-grid-action';
import { DataGridColumn } from 'src/app/core/interfaces/data-grid-column';
import { DataGridFilter } from 'src/app/core/interfaces/data-grid-filter';
import { Procedure } from 'src/app/core/interfaces/procedure';
import { ProceduresService } from 'src/app/core/services/procedures/procedures.service';
import { AddProcedureComponent } from '../add-procedure/add-procedure.component';
import { GridColumnTypes } from 'src/app/core/enums/grid-column-types.enum';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';

@Component({
  selector: 'app-procedures-list',
  templateUrl: './procedures-list.component.html',
  styleUrls: ['./procedures-list.component.css']
})
export class ProceduresListComponent implements OnInit {

  proceduresList: Procedure[] = []
  gridData: any[] = []
  filterData: any[] = []
  isShowAddDialog: boolean = false
  isShowDetailsDialog: boolean = false
  filterTypes = FilterTypes
  selectedProcedureForEdit: Procedure | undefined
  isEdit: boolean = false
  @ViewChild(AddProcedureComponent) addProcedureComponent!: AddProcedureComponent


  gridColumns: DataGridColumn[] = [
    {
      header: "اسم الإجراء",
      field: "name",
      type: GridColumnTypes.text
    },
    {
      header: "سعر الإجراء",
      field: "price",
      type: GridColumnTypes.text
    },
    {
      header: "الاطباء",
      field: "doctors",
      type: GridColumnTypes.array
    },
    {
      header: "يقبل التأمين",
      field: "acceptInsurance",
      type: GridColumnTypes.boolean
    },
    {
      header: "السن من",
      field: "ageFrom",
      type: GridColumnTypes.withUnit,
      unitField: "ageFromUnit"
    },
    {
      header: "السن إلى",
      field: "ageTo",
      type: GridColumnTypes.withUnit,
      unitField: "ageToUnit"
    },
    {
      header: "ملاحظات",
      field: "notes",
      type: GridColumnTypes.text
    }
  ]

  gridFilters: DataGridFilter[] = [
    {
      controlName: "name",
      label: "اسم الإجراء",
      type: this.filterTypes.text
    },
    {
      controlName: "doctors",
      label: "الأطباء",
      type: this.filterTypes.dropdown,
      dataApi: "doctors/getDoctors",
      multiSelect: true,
      matchMulti: true,
      matchWith: "doctorIds",
      optionLabel: "name",
      optionValue: "_id"
    }
  ]

  gridActions: DataGridAction = {
    showDetails: false,
    showDelete: true,
    showEdit: true,
  }

  constructor(
    private proceduresService: ProceduresService,
    private confirmationService: ConfirmationService,
    private tranlslate: TranslateService,
    private alertify: AlertifyService,
  ) { }

  ngOnInit() {
    this.getProceduresList()
  }

  getProceduresList() {
    this.proceduresService.getProcedures().subscribe(res => {
      if (res.isSuccess) {
        this.proceduresList = res.data
        this.gridData = res.data.map((proc: any) => {
          let modifiedProcedure = {
            ...proc,
            doctors: proc.doctors.map((doc: any) => doc.name),
            doctorIds: proc.doctors.map((doc: any) => doc._id)
          }
          return modifiedProcedure
        })

        this.filterData = [...this.gridData]
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
    this.selectedProcedureForEdit = undefined
    this.isEdit = false
    this.addProcedureComponent.resetAddForm()
  }

  onAddProcedure() {
    this.hideAddDialog()
    this.getProceduresList()
  }

  openEditPopup(doctorId: string) {
    this.isEdit = true
    let selectedProcedure = this.proceduresList.find(proc => proc._id == doctorId)
    if (selectedProcedure) {
      this.selectedProcedureForEdit = selectedProcedure
      this.showAddDialog()
    }

  }

  openDeleteConfirmation(procedureId: string) {
    let selectedProcedure = this.proceduresList.find(proc => proc._id == procedureId)
    this.confirmationService.confirm({
      key: "confirmDelete",
      message: `${this.tranlslate.instant('GENERIC.DELETE_MSG')} ${selectedProcedure?.name}`,
      acceptLabel: this.tranlslate.instant('GENERIC.CONFIRM'),
      rejectLabel: this.tranlslate.instant('GENERIC.IGNORE'),
      accept: () => {
        this.proceduresService.deleteProcedure(procedureId).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.tranlslate.instant('GENERIC.DELETE_SUCCESS'))
            this.getProceduresList()
          } else {
            this.alertify.error(res.message)
          }
        })
      }
    });
  }
}
