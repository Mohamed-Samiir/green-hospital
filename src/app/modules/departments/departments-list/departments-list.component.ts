import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { DataGridAction } from 'src/app/core/interfaces/data-grid-action';
import { DataGridColumn } from 'src/app/core/interfaces/data-grid-column';
import { DataGridFilter } from 'src/app/core/interfaces/data-grid-filter';
import { Department } from 'src/app/core/interfaces/department';
import { DepartmentsService } from 'src/app/core/services/departments/departments.service';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { FilterTypes } from 'src/app/core/enums/filter-types.enum';
import { GridColumnTypes } from 'src/app/core/enums/grid-column-types.enum';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent implements OnInit {
  departmentsList: Department[] = []
  gridData: any[] = []
  filterData: any[] = []
  isShowAddDialog: boolean = false
  isShowDetailsDialog: boolean = false
  filterTypes = FilterTypes
  selectedDoctorForEdit: Department | undefined
  selectedDoctorForDetails: Department | undefined
  isEdit: boolean = false
  @ViewChild(AddDepartmentComponent) addDoctorComponent!: AddDepartmentComponent


  gridColumns: DataGridColumn[] = [
    {
      header: "القسم",
      field: "name",
      type: GridColumnTypes.text
    },
    {
      header: "الفرع",
      field: "branchName",
      type: GridColumnTypes.text
    },
    {
      header: "أرقام التواصل",
      field: "phoneNumbers",
      type: GridColumnTypes.array
    },
    {
      header: "يسمح بالتواصل ",
      field: "allowContact",
      type: GridColumnTypes.boolean
    },
    {
      header: "فترات العمل",
      field: "contactPeriods",
      type: GridColumnTypes.text
    },

  ]

  gridFilters: DataGridFilter[] = [
    {
      controlName: "name",
      label: "القسم",
      type: this.filterTypes.text
    },
    {
      controlName: "branches",
      label: "الفروع",
      type: this.filterTypes.dropdown,
      dataApi: "branches/getBranches",
      multiSelect: true,
      matchMulti: true,
      matchWith: "branchId",
      optionLabel: "name",
      optionValue: "_id"
    },
    {
      controlName: "phoneNumbers",
      label: "رقم التواصل",
      type: this.filterTypes.number,
      matchMulti: true
    }
  ]

  gridActions: DataGridAction = {
    showDetails: false,
    showDelete: true,
    showEdit: true,
  }
  constructor(
    private departmentsService: DepartmentsService,
    private confirmationService: ConfirmationService,
    private tranlslate: TranslateService,
    private alertify: AlertifyService,
  ) { }

  ngOnInit() {
    this.getDepartmentsList()
  }

  getDepartmentsList() {
    this.departmentsService.getDepartments().subscribe(res => {
      if (res.isSuccess) {
        this.departmentsList = res.data.map((dept: any) => ({
          ...dept,
          branchName: dept.branchId?.name || 'غير محدد',
          branchId: dept.branchId?._id || null // Ensure branchId is available as string for filtering
        }))
        this.gridData = [...this.departmentsList]
        this.filterData = [...this.departmentsList]
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
    this.selectedDoctorForEdit = undefined
    this.isEdit = false
    this.addDoctorComponent.resetAddForm()
  }

  onAddDepartment() {
    this.hideAddDialog()
    this.getDepartmentsList()
  }

  openEditPopup(departmentId: string) {
    this.isEdit = true
    let selectedDepartment = this.departmentsList.find(dep => dep._id == departmentId)
    if (selectedDepartment) {
      this.selectedDoctorForEdit = selectedDepartment
      this.showAddDialog()
    }

  }

  openDeleteConfirmation(doctorId: string) {
    let selectedDoctor = this.departmentsList.find(doc => doc._id == doctorId)
    this.confirmationService.confirm({
      key: "confirmDelete",
      message: `${this.tranlslate.instant('GENERIC.DELETE_MSG')} ${selectedDoctor?.name}`,
      acceptLabel: this.tranlslate.instant('GENERIC.CONFIRM'),
      rejectLabel: this.tranlslate.instant('GENERIC.IGNORE'),
      accept: () => {
        this.departmentsService.deleteDepartment(doctorId).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.tranlslate.instant('GENERIC.DELETE_SUCCESS'))
            this.getDepartmentsList()
          } else {
            this.alertify.error(res.message)
          }
        })
      }
    });
  }

  hideDetailsDialog() {
    this.isShowDetailsDialog = false
    this.selectedDoctorForDetails = undefined
  }

  showDetailsDialog() {
    this.isShowDetailsDialog = true
  }

  onShowDetails(doctorId: string) {
    let selectedDoctor = this.departmentsList.find(doc => doc._id == doctorId)
    if (selectedDoctor) {
      this.selectedDoctorForDetails = selectedDoctor
      this.showDetailsDialog()
    }
  }

}
