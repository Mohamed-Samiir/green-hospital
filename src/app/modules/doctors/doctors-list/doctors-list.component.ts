import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterTypes } from 'src/app/core/enums/filter-types.enum';
import { DataGridAction } from 'src/app/core/interfaces/data-grid-action';
import { DataGridColumn } from 'src/app/core/interfaces/data-grid-column';
import { DataGridFilter } from 'src/app/core/interfaces/data-grid-filter';
import { DoctorModel } from 'src/app/core/interfaces/doctor/doctor-model';
import { DoctorsService } from 'src/app/core/services/Doctors/doctors.service';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {

  doctorsList: DoctorModel[] = []
  gridData: any[] = []
  filterData: any[] = []
  isShowAddDialog: boolean = false
  isShowDetailsDialog: boolean = false
  filterTypes = FilterTypes
  selectedDoctorForEdit: DoctorModel | undefined
  selectedDoctorForDetails: DoctorModel | undefined
  isEdit: boolean = false
  @ViewChild(AddDoctorComponent) addDoctorComponent!: AddDoctorComponent


  gridColumns: DataGridColumn[] = [
    {
      header: "اسم الطبيب",
      field: "name",
      type: 1
    },
    {
      header: "الدرجة العلمية",
      field: "degree",
      type: 1
    },
    {
      header: "التخصص",
      field: "specialization",
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
      controlName: "name",
      label: "اسم الطبيب",
      type: this.filterTypes.text
    },
    {
      controlName: "degree",
      label: "الدرجة العلمية",
      type: this.filterTypes.text
    },
    {
      controlName: "specialization",
      label: "التخصص الرئيسي",
      type: this.filterTypes.dropdown,
      dataApi: "specializations/getSpecializations",
      optionValue: "_id",
      optionLabel: "name",
      multiSelect: true,
      matchWith: "specializationId",
      matchMulti: false
    },
    {
      controlName: "subSpecializations",
      label: "التخصصات الفرعية",
      type: this.filterTypes.dropdown,
      dataApi: "specializations/getSubSpecializations",
      optionValue: "_id",
      optionLabel: "name",
      multiSelect: true,
      matchWith: "subSpecializationsIds",
      matchMulti: true
    }
  ]

  gridActions: DataGridAction = {
    showDetails: true,
    showDelete: true,
    showEdit: true,
  }

  constructor(
    private doctorsService: DoctorsService,
    private confirmationService: ConfirmationService,
    private tranlslate: TranslateService,
    private alertify: AlertifyService,
  ) { }

  ngOnInit() {
    this.getDoctorsList()
  }

  getDoctorsList() {
    this.doctorsService.getDoctors().subscribe(res => {
      if (res.isSuccess) {
        this.doctorsList = res.data
        this.gridData = res.data.map((doc: any) => {
          let modifiedDoctor = {
            ...doc,
            specialization: doc?.specialization?.name,
            specializationId: doc?.specialization?._id,
            subSpecializations: doc?.subSpecializations?.map((subSpec: any) => subSpec.name),
            subSpecializationsIds: doc?.subSpecializations?.map((subSpec: any) => subSpec._id)
          }
          return modifiedDoctor
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
    this.selectedDoctorForEdit = undefined
    this.isEdit = false
    this.addDoctorComponent.resetAddForm()
  }

  onAddDoctor() {
    this.hideAddDialog()
    this.getDoctorsList()
  }

  openEditPopup(doctorId: string) {
    this.isEdit = true
    let selectedDoctor = this.doctorsList.find(doc => doc._id == doctorId)
    if (selectedDoctor) {
      this.selectedDoctorForEdit = selectedDoctor
      this.showAddDialog()
    }

  }

  openDeleteConfirmation(doctorId: string) {
    let selectedDoctor = this.doctorsList.find(doc => doc._id == doctorId)
    this.confirmationService.confirm({
      key: "confirmDelete",
      message: `${this.tranlslate.instant('GENERIC.DELETE_MSG')} ${selectedDoctor?.name}`,
      acceptLabel: this.tranlslate.instant('GENERIC.CONFIRM'),
      rejectLabel: this.tranlslate.instant('GENERIC.IGNORE'),
      accept: () => {
        this.doctorsService.deleteDoctor(doctorId).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.tranlslate.instant('GENERIC.DELETE_SUCCESS'))
            this.getDoctorsList()
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
    let selectedDoctor = this.doctorsList.find(doc => doc._id == doctorId)
    if (selectedDoctor) {
      this.selectedDoctorForDetails = selectedDoctor
      this.showDetailsDialog()
    }
  }
}
