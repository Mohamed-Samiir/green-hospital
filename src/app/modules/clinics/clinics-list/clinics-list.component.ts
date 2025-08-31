import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterTypes } from 'src/app/core/enums/filter-types.enum';
import { Clinic } from 'src/app/core/interfaces/clinic';
import { AddClinicComponent } from '../add-clinic/add-clinic.component';
import { DataGridAction } from 'src/app/core/interfaces/data-grid-action';
import { DataGridFilter } from 'src/app/core/interfaces/data-grid-filter';
import { DataGridColumn } from 'src/app/core/interfaces/data-grid-column';
import { ClinicsService } from 'src/app/core/services/clinics.service';
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { GridColumnTypes } from 'src/app/core/enums/grid-column-types.enum';
import { ClinicDoctor } from 'src/app/core/interfaces/clinic-doctor';
import { faEye, faPenToSquare, faTrashCan, faLock } from '@fortawesome/free-solid-svg-icons';
import { ClinicDoctorService } from 'src/app/core/services/clinics/clinic-doctor.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';

@Component({
  selector: 'app-clinics-list',
  templateUrl: './clinics-list.component.html',
  styleUrls: ['./clinics-list.component.css']
})
export class ClinicsListComponent implements OnInit {

  clinicsList: Clinic[] = []
  gridData: any[] = []
  filterData: any[] = []
  isShowAddClinicDialog: boolean = false
  isShowDetailsDialog: boolean = false
  isShowAddDoctorDialog: boolean = false
  filterTypes = FilterTypes
  selectedClinicForEdit: Clinic | undefined
  selectedClinicrForDetails: Clinic | undefined
  selectedDoctorForEdit: ClinicDoctor | undefined
  isEdit: boolean = false
  selectedClinic: Clinic
  gridColumnTypes = GridColumnTypes
  @ViewChild(AddClinicComponent) addDoctorComponent!: AddClinicComponent

  faEye = faEye
  faPenToSquare = faPenToSquare
  faTrashCan = faTrashCan
  faLock = faLock

  constructor(
    private clinicsService: ClinicsService,
    public confirmationService: ConfirmationService,
    private tranlslate: TranslateService,
    private clinicDoctorService: ClinicDoctorService,
    public authService: AuthService,
    private alertify: AlertifyService,
  ) { }

  gridColumns: DataGridColumn[] = [
    {
      header: "اسم الطبيب",
      field: "name",
      type: 1
    },
    {
      header: "الفروع",
      field: "branchesDisplay",
      type: 1
    },
    {
      header: "سعر الكشف",
      field: "price",
      type: 1
    },
    {
      header: "يقبل التأمين",
      field: "acceptInsurance",
      type: 3
    },
    {
      header: "استشارة مجانية",
      field: "freeVisitFollowup",
      type: 3
    },
    {
      header: "سن الكشف من",
      field: "ageFrom",
      type: 5,
      unitField: "ageFromUnit"
    },
    {
      header: "سن الكشف إلى",
      field: "ageTo",
      type: 5,
      unitField: "ageToUnit"
    },
    {
      header: "ملاحظات",
      field: "notes",
      type: 1
    }
  ]

  gridFilters: DataGridFilter[] = [
    {
      controlName: "clinicName",
      label: "اسم العيادة",
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
    },
    {
      controlName: "branches",
      label: "الفروع",
      type: this.filterTypes.dropdown,
      dataApi: "branches/getBranches",
      multiSelect: true,
      matchMulti: true,
      matchWith: "branchIds",
      optionLabel: "name",
      optionValue: "_id"
    }
  ]

  gridActions: DataGridAction = {
    showDetails: false,
    showDelete: true,
    showEdit: true,
  }

  ageUnits = [
    {
      id: 1,
      name: "يوم"
    },
    {
      id: 2,
      name: "شهر"
    },
    {
      id: 3,
      name: "سنة"
    }
  ]

  ngOnInit() {
    this.getClinicsList()
  }

  getClinicsList() {
    this.clinicsService.getClinics().subscribe(res => {
      if (res.isSuccess) {
        this.clinicsList = res.data
        this.gridData = res.data.map((clinic: any) => {
          let modifiedClinic = {
            ...clinic,
            doctors: clinic?.doctors.map((doc: any) => {
              // Handle multiple branch names
              let branchesDisplay = 'غير محدد';
              if (doc?.branches && doc.branches.length > 0) {
                const validBranches = doc.branches.filter((branch: any) => branch && branch.branchName);
                if (validBranches.length > 0) {
                  branchesDisplay = validBranches.map((branch: any) => branch.branchName).join(', ');
                }
              }

              return {
                ...doc,
                branchesDisplay: branchesDisplay, // For display in grid
                // Keep original branches array for editing
                branches: doc?.branches || []
              }
            }),
          }

          return modifiedClinic
        })
        this.filterData = [...this.gridData]
      }
    })
  }

  filterClinics(filters: any) {
    let filteredData = []
    if (filters.clinicName) {
      filteredData = this.filterData.filter(clinic => clinic.clinicName.includes(filters.clinicName))
    } else {
      filteredData = [...this.filterData]
    }

    if (filters.doctors && filters.doctors.length) {
      filteredData = filteredData.filter(clinic => {
        return clinic.doctors.some((doc: any) => filters.doctors.includes(doc.doctorId))
      }).map(clinic => {
        return {
          ...clinic,
          doctors: clinic.doctors.filter((doc: any) => filters.doctors.includes(doc.doctorId))
        }
      })
    }

    if (filters.branches && filters.branches.length) {
      let matchedClinics: any[] = []
      filteredData.forEach(clinic => {
        let matchedDoctors = clinic.doctors.filter((doc: any) => {
          return doc.branches.some((branch: any) => filters.branches.includes(branch._id))
        })

        if (matchedDoctors.length) {
          matchedClinics.push({
            ...clinic,
            doctors: matchedDoctors
          })
        }
      })

      filteredData = matchedClinics
    }

    this.setFilteredData(filteredData)
  }

  setFilteredData(filteredData: any[]) {
    this.gridData = filteredData
  }

  showAddClinicDialog() {
    this.isShowAddClinicDialog = true
  }

  hideAddClinicDialog() {
    this.isShowAddClinicDialog = false
    this.selectedClinicForEdit = undefined
    this.isEdit = false
    this.addDoctorComponent.resetAddForm()
  }

  onAddClinic(event: any) {
    this.hideAddClinicDialog()
    this.getClinicsList()
  }

  onAddClinicDoctor(event: any) {
    this.hideAddClinicDoctorDialog()
    this.getClinicsList()
  }

  openEditPopup(doctorId: string) {
    this.isEdit = true
    let selectedDoctor = this.clinicsList.find(doc => doc._id == doctorId)
    if (selectedDoctor) {
      this.selectedClinicForEdit = selectedDoctor
      this.showAddClinicDialog()
    }

  }

  hideDetailsDialog() {
    this.isShowDetailsDialog = false
    this.selectedClinicForEdit = undefined
  }

  showDetailsDialog() {
    this.isShowDetailsDialog = true
  }

  onShowDetails(clinicId: string) {
    let selectedClinic = this.clinicsList.find(clinic => clinic._id == clinicId)
    if (selectedClinic) {
      this.selectedClinicForEdit = selectedClinic
      this.showDetailsDialog()
    }
  }

  showAddClinicDoctorDialog(e: Event, clinic: Clinic) {
    e.stopPropagation()
    this.isShowAddDoctorDialog = true
    this.selectedClinic = clinic
  }

  hideAddClinicDoctorDialog() {
    this.isShowAddDoctorDialog = false
  }

  getUnitName(unitId: number) {
    if (unitId) {
      let unitName = this.ageUnits.find(unit => unit.id == unitId)
      if (unitName)
        return unitName.name
    }

    return null
  }

  editClinicDoctor(clinic: any, doctor: ClinicDoctor) {
    this.selectedClinic = clinic
    this.selectedDoctorForEdit = doctor
    this.isShowAddDoctorDialog = true
  }

  deleteClinicDoctor(clinicDoctor: ClinicDoctor) {

    this.confirmationService.confirm({
      key: "confirmDelete",
      message: `${this.tranlslate.instant('GENERIC.DELETE_MSG')} ${clinicDoctor?.doctor}`,
      acceptLabel: this.tranlslate.instant('GENERIC.CONFIRM'),
      rejectLabel: this.tranlslate.instant('GENERIC.IGNORE'),
      accept: () => {
        this.clinicDoctorService.deleteClinicDoctor(clinicDoctor._id).subscribe(res => {
          if (res.isSuccess) {
            this.getClinicsList()
          }
        })
      }
    });
  }

  editClinic(e: any, clinic: any) {
    e.stopPropagation()
    this.selectedClinicForEdit = clinic
    this.isShowAddClinicDialog = true
  }

  deleteClinic(e: any, clinic: any) {
    e.stopPropagation()

    this.confirmationService.confirm({
      key: "confirmDelete",
      message: `${this.tranlslate.instant('GENERIC.DELETE_MSG')} ${clinic?.name}`,
      acceptLabel: this.tranlslate.instant('GENERIC.CONFIRM'),
      rejectLabel: this.tranlslate.instant('GENERIC.IGNORE'),
      accept: () => {
        this.clinicsService.deleteClinic(clinic._id).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.tranlslate.instant('GENERIC.DELETE_SUCCESS'))
            this.getClinicsList()
          } else {
            this.alertify.error(res.message)
          }
        })
      }
    });
  }

}
